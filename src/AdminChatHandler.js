import RoleMaster from "../src/RoleMaster";
import RoleSeparators from "./RoleSeparators";

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

      if (roleName.length == 0) {
        return new Promise((resolve, _) => {
          resolve("Sorry, that role can not be made.");
        });
      }

      // Check to see if that role exists already
      const role = new RoleMaster().getRole(this.message.guild, roleName);
      if (role !== null) {
        return new Promise((resolve, _) => {
          resolve("Sorry, that role already exists.");
        });
      }

      // Actually make the new role
      return new Promise((resolve, _) => {
        new RoleMaster()
          .createRole(this.message.guild, roleName)
          .then(message => {
            resolve(message);
          });
      });
    } else if (this.message.content.startsWith("!makeRoleSeparators")) {
      new RoleSeparators(this.message.guild, this.message).makeRoles();
      return new Promise((resolve, _) => {
        resolve("Creating role separators...");
      });
    } else {
      return new Promise((resolve, _) => {
        resolve("Command not found. Try !help");
      });
    }
  }
}

export default AdminChatHandler;
