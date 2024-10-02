const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./config.json");
const { languages } = require("./languages.json");
const { Translate } = require("@google-cloud/translate").v2;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Instantiate Google Cloud Translate API client
const translate = new Translate({});
(async () => {
  const [projectId] = await translate.getProjectId();
  console.log(`Authenticated as project: ${projectId}`);
})();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

async function translateText(text, target) {
  try {
    const [translation] = await translate.translate(text, target);
    // Safeguard if translation fails or returns unexpected result
    if (!translation) throw new Error("No translation returned");
    return translation;
  } catch (error) {
    console.error("Error during translation:", error);
    return "An error occurred during translation.";
  }
}

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch(); // Fetch message details if needed
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      return;
    }
  }

  if (reaction.count < 2) {
    const language = languages[reaction.emoji.name];
    if (!language) {
      console.warn(`No language found for emoji: ${reaction.emoji.name}`);
      return; // Exit if no matching language
    }

    const reactionMessage = reaction.message.content || reaction.message;
    try {
      const translation = await translateText(
        reactionMessage,
        language["code"]
      );
      const formattedMessage = `**Translation to ${reaction.emoji.name}  •  Requested by:** ${user}\n${translation}`;
      await reaction.message.reply(formattedMessage);
    } catch (error) {
      console.error("Error during translation or message reply:", error);
    }
  }
});

client.login(token);
