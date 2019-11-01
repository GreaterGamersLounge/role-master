// Global objects
import Discord from "discord.js";
import { adminChannelName, token } from "./config/config.json";
import RoleMaster from "./src/RoleMaster";
import AdminChatHandler from "./src/AdminChatHandler";
import { Client } from "pg";
// const { Client } = require("pg");

const discordClient = new Discord.Client();
global.pgClient = new Client({
  connectionString: process.env.DATABASE_URL
});

discordClient.on("ready", () => {
  console.log("Booting complete!");
  console.log("Bot online!");
});

discordClient.on("message", message => {
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

discordClient.on("presenceUpdate", (_, newMember) => {
  if (newMember.user.bot === true) return;

  const presence = newMember.presence;
  if (presence.status == "online" && presence.game != null) {
    new RoleMaster().attemptRoleAdd(newMember, presence.game.name);
    console.log(newMember.displayName, "is now playing:", presence.game.name);
  }
});

const init = () => {
  console.log("Booting up...");

  console.log("Logging in to Discord...");
  discordClient.login(token);

  console.log("Connecting to postgres...");
  global.pgClient.connect();
};

init();
