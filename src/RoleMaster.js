class RoleMaster {
  constructor(user, roleName) {
    this.user = user;
    this.roleName = roleName;

    console.log("I AM THE ROLE MASTER!");
  }

  attemptRoleAdd() {
    // Grab the potential role we want to add
    const role = this.getRole();

    // If the correct role exists already
    if (role !== null) {
      console.log("GOT IT!");
      this.addRole(role);
    } else {
      // Ask the admins to add it or something.  Soon™
      console.log(`Sorry, I could not find role: ${this.roleName}`);
      console.log("<sadface>");
    }
  }

  addRole(role) {
    // Maybe want to return if this worked or not later on?
    this.user.addRole(role).catch(console.error);
    console.log(`Role "${this.roleName}" given to ${this.user.username}.`);
  }

  getRole() {
    return this.user.guild.roles.find("name", this.roleName);
  }

  createRole() {
    // TODO
  }

  removeRole() {
    // member.removeRole(role).catch(console.error);
  }
}

module.exports = RoleMaster;
