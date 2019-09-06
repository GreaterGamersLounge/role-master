import {
  role_separators,
  separator_color,
  max_role_length,
  yes_reaction,
  no_reaction,
  arrow,
  U2063,
  EN_Space
} from "../config/role_separators.json";
import RoleMaster from "./RoleMaster";

class RoleSeparators {
  constructor(guild, message) {
    this.guild = guild;
    this.sourceMessage = message;
  }

  getContinueReaction(text, delay = 30 * 1000) {
    return new Promise((resolve, reject) => {
      this.sourceMessage.channel.send(text).then(message => {
        message
          .react(yes_reaction)
          .then(reaction => reaction.message.react(no_reaction));

        const filter = (reaction, user) => {
          return (
            (reaction.emoji.name === yes_reaction ||
              reaction.emoji.name === no_reaction) &&
            user.id === this.sourceMessage.author.id
          );
        };

        const collector = message.createReactionCollector(filter, {
          time: delay
        });

        collector.on("collect", reaction => {
          if (reaction.emoji.name === yes_reaction) {
            resolve({ message, shouldDelete: true });
          } else if (reaction.emoji.name === no_reaction) {
            resolve({ message, shouldDelete: false });
          } else {
            reject(message);
          }
        });

        collector.on("end", () => {
          reject(message);
        });
      });
    });
  }

  clearCurrentRoles() {
    return new Promise(resolve => {
      // Remove all current role separators
      const roleSeparators = this.guild.roles.filter(
        role => role.hexColor == separator_color
      );

      let toSkip = [];

      if (roleSeparators.size == 0) {
        resolve(toSkip);
      }

      let responses = 0;

      roleSeparators.forEach(role => {
        // Ask about removal
        const removalMessage = `Would you like to remove the \`${role.name}\` role?`;
        this.getContinueReaction(removalMessage)
          .then(response => {
            const { message, shouldDelete } = response;

            // Delete the message that had the reaction on it.
            message.delete();

            if (shouldDelete) {
              role.delete(message).then(() => {
                this.sourceMessage.channel.send(
                  `Removed role separator: ${role.name}`
                );
              });
            } else {
              this.sourceMessage.channel.send(
                `Keeping role separator: ${role.name}`
              );
              toSkip.push(role.name);
            }

            responses++;

            if (responses == roleSeparators.size) {
              resolve(toSkip);
            }
          })
          .catch(message => {
            // Delete the message that had the reaction on it.
            message.delete().then(() => {
              toSkip.push(role.name);
              console.log(`No response for role: \`${role.name}\``);

              responses++;
              if (responses == roleSeparators.size) {
                resolve(toSkip);
              }
            });
          });
      });
    });
  }

  makeRoles() {
    const rm = new RoleMaster();

    const clearing = this.clearCurrentRoles();

    clearing.then(toSkip => {
      role_separators.forEach(role_separator => {
        let fullName = `${arrow} -- ${role_separator.name} -- ${arrow}`;
        const padding = Math.floor((max_role_length - fullName.length) / 2) - 2;
        fullName = `${U2063}${EN_Space.repeat(
          padding
        )}${fullName}${EN_Space.repeat(padding)}${U2063}`;

        if (!toSkip.includes(fullName)) {
          rm.createRole(
            this.sourceMessage.guild,
            fullName,
            separator_color
          ).then(message => {
            this.sourceMessage.channel.send(message);
          });
        } else {
          this.sourceMessage.channel.send(
            `Role \`${fullName}\` already exists.  Skipping.`
          );
        }
      });
    });
  }
}

export default RoleSeparators;
