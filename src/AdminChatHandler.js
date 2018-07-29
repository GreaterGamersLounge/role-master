const config = require("../config/config.json");
const RoleMaster = require("../src/RoleMaster");

class AdminChatHandler {
  constructor(message) {
    this.message = message;
    this.response = "";
  }
  getResponse() {
    // This could use better handling for more commands
    // but it's okay for now...

    // Create game role command
    if (this.message.content.startsWith("!cgr ")) {
      const roleName = this.message.content.split("!cgr ")[1];

      // TODO: Check to see if that role exists already

      if (roleName.length == 0) {
        return new Promise((resolve, _) => {
          resolve("Sorry, that role can not be made.");
        });
      }

      return new Promise((resolve, _) => {
        new RoleMaster().
          createRole(this.message.guild, roleName).
          then((message) => {
            resolve(message);
          });
      })
    } else {
      return new Promise((resolve, _) => {
        resolve("Command not found. Try !help");
      });
    }
  }
}

module.exports = AdminChatHandler;
