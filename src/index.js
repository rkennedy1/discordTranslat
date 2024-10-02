const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./config/config.json");
const { setupClient } = require("./client");

require("dotenv").config();

const client = setupClient(); // setup Discord client

client.login(token);
