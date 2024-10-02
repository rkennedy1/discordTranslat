const { languages } = require("../data/languages.json");
const { translateText } = require("../utils/translate");

async function handleMessageReactionAdd(reaction, user) {
  console.log(`Reaction added: ${reaction.emoji.name} by ${user.tag}`);

  if (!reaction.message.content) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Error fetching the reaction:", error);
    }
  }

  const language = languages[reaction.emoji.name];
  if (!language) {
    console.warn(`No language found for emoji: ${reaction.emoji.name}`);
    return;
  }

  const reactionMessage = reaction.message.content || reaction.message;
  if (typeof reactionMessage !== "string" || reactionMessage.trim() === "") {
    console.warn(
      "Message content is empty or not a string, skipping translation."
    );
    return;
  }

  try {
    const translation = await translateText(
      reaction.client.translate,
      reactionMessage,
      language["code"]
    );
    const formattedMessage = `**Translation to ${reaction.emoji.name}  •  Requested by:** ${user.tag}\n${translation}`;

    try {
      await reaction.message.reply(formattedMessage);
    } catch (replyError) {
      console.error("Error sending reply:", replyError);
    }
  } catch (apiError) {
    console.error("API error during translation:", apiError);
  }
}

module.exports = { handleMessageReactionAdd };
