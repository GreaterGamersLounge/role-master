class AdminChatHandler {
  constructor(message, config) {
    this.message = message;
    this.config = config;
    this.response = "Something went wrong...";

    this.processMessage();
  }
  processMessage() {
    // This could use better handling for more commands
    // but it's okay for now...

    // Create game role command
    if (this.message.content.startsWith("!cgr ")) {
      const roleName = this.message.content.split("!cgr ")[1];

      // TODO: Check to see if that rold exists already

      if (roleName.length == 0) {
        this.response = "Sorry, that role can not be made.";
        return
      }

      const newRole = this.message.guild.createRole({
        name: roleName,
        color: this.config.gameRoleColor,
        permissions: [],
        mentionable: true
      })

      this.response = `Created new role with name ${roleName} and color ${this.config.gameRoleColor}`
    }
  }
}

module.exports = AdminChatHandler;
