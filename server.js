// Global objects
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const RoleMaster = require("./role-master.js");

client.on("ready", () => {
  console.log("Booting complete!");
  console.log("Bot online!");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.on("presenceUpdate", (_, newMember) => {
  // Don't respond to things from other bots
  if (newMember.user.bot === true) {
    return
  }

  const presence = newMember.presence
  if (presence.status == "online" && presence.game != null) {
    const rm = new RoleMaster(newMember, presence.game.name);
    rm.attemptRoleAdd();
    console.log(newMember.displayName, "is now playing:", presence.game.name);
  }
});

console.log("Booting up...");
client.login(config.token);
