const { token } = require("./config/config.json");
const { setupClient } = require("./client");
const logger = require("./utils/logger");

require("dotenv").config();

logger.info("Starting the bot...");
const client = setupClient();

client.login(token);
