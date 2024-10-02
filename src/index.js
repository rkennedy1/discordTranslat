// index.js
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { token } = require("./config/config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Attach a container for utilities and configurations
client.utils = {};
client.config = {};

// Dynamically load event handlers
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach((file) => {
  const event = require(`./events/${file}`);
  const eventName = event.name;
  if (event.once) {
    client.once(eventName, (...args) => event.execute(client, ...args));
  } else {
    client.on(eventName, (...args) => event.execute(client, ...args));
  }
});

client.login(token);
