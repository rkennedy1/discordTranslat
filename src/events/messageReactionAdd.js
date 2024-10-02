// events/messageReactionAdd.js
const { Events } = require("discord.js");
const translateText = require("../utils/translate");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(client, reaction, user) {
    console.log(`Reaction added: ${reaction.emoji.name} by ${user.tag}`);

    // Fetch reaction if it's partial
    if (reaction.partial) {
      try {
        await reaction.fetch();
        console.log("Reaction fetched successfully");
      } catch (error) {
        console.error("Error fetching the reaction:", error);
        return;
      }
    }

    const language = client.config.languages[reaction.emoji.name];
    if (!language) {
      console.warn(`No language found for emoji: ${reaction.emoji.name}`);
      return;
    }

    const messageContent = reaction.message.content;
    if (typeof messageContent !== "string" || messageContent.trim() === "") {
      console.warn(
        "Message content is empty or not a string, skipping translation."
      );
      return;
    }

    console.log(`Message to translate: "${messageContent}"`);

    try {
      const translation = await translateText(
        client.utils.translate,
        messageContent,
        language.code
      );
      const formattedMessage = `**Translation to ${reaction.emoji.name} • Requested by:** ${user.tag}\n${translation}`;

      await reaction.message.reply(formattedMessage);
      console.log("Reply sent successfully");
    } catch (error) {
      console.error("Error during translation or reply:", error);
    }
  },
};
