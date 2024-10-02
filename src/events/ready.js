// events/ready.js
const { Events } = require("discord.js");
const { Translate } = require("@google-cloud/translate").v2;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.utils.translate = new Translate({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    });

    client.config.languages = require("../config/languages.json");

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
