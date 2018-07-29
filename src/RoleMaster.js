class RoleMaster {
  constructor() {
    console.log("I AM THE ROLE MASTER!");
  }

  attemptRoleAdd(user, roleName) {
    // Grab the potential role we want to add
    const role = this.getRole(user, roleName);

    // If the correct role exists already
    if (role !== null) {
      console.log("GOT IT!");
      this.addRole(user, role);
    } else {
      // Ask the admins to add it or something.  Soon™
      console.log(`Sorry, I could not find role: ${roleName}`);
      console.log("<sadface>");
    }
  }

  addRole(user, role) {
    // Maybe want to return if this worked or not later on?
    user.addRole(role).catch(console.error);
    console.log(`Role "${role.name}" given to ${user.displayName}.`);
  }

  getRole(user, roleName) {
    return user.guild.roles.find("name", roleName);
  }

  createRole() {
    // TODO
  }

  removeRole() {
    // member.removeRole(role).catch(console.error);
  }
}

module.exports = RoleMaster;
