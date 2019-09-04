import {
  role_separators,
  separator_color,
  max_role_length,
  arrow,
  U2063,
  EN_Space
} from "../config/role_separators.json";
import RoleMaster from "./RoleMaster";

class RoleSeparators {
  constructor(guild) {
    this.guild = guild;
  }
  makeRoles() {
    const rm = new RoleMaster();

    // Remove all current role separators
    this.guild.roles
      .filter(role => role.hexColor == separator_color)
      .forEach(role => {
        const message = `Removed role separator: ${role.name}`;
        console.log(message);
        role.delete(message);
      });

    role_separators.forEach(role_separator => {
      console.log(role_separator);

      let fullName = `${arrow} -- ${role_separator.name} -- ${arrow}`;
      const padding = Math.floor((max_role_length - fullName.length) / 2) - 2;
      fullName = `${U2063}${EN_Space.repeat(
        padding
      )}${fullName}${EN_Space.repeat(padding)}${U2063}`;

      console.log(fullName);

      // Check to see if that role exists already
      const role = rm.getRole(this.guild, fullName);
      if (role == null) {
        // Actually make the thing
        rm.createRoleNoPromise(this.guild, fullName, separator_color);
      }
    });

    // // Actually make the new role
    // return new Promise((resolve, _) => {
    //   new RoleMaster()
    //     .createRole(this.message.guild, roleName)
    //     .then(message => {
    //       resolve(message);
    //     });
    // });
  }
}

export default RoleSeparators;
