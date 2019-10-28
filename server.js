// Global objects
import Discord from "discord.js";
import { adminChannelName, token } from "./config/config.json";
import RoleMaster from "./src/RoleMaster";
import AdminChatHandler from "./src/AdminChatHandler";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Booting complete!");
  console.log("Bot online!");
});

client.on("message", message => {
  // Don't respond to other bots or private messages
  if (message.author.bot) return;
  if (message.guild == null) return;

  if (message.channel.name == adminChannelName) {
    console.log("Incoming admin message...");
    new AdminChatHandler(message).getResponse().then(response => {
      message.channel.send(response);
    });
  }
});

client.on("presenceUpdate", (_, newMember) => {
  if (newMember.user.bot === true) return;

  const presence = newMember.presence;
  if (presence.status == "online" && presence.game != null) {
    new RoleMaster().attemptRoleAdd(newMember, presence.game.name);
    console.log(newMember.displayName, "is now playing:", presence.game.name);
  }
});

console.log("Booting up...");
client.login(token);
