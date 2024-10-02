const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { handleReady } = require("./events/ready");
const { handleMessageReactionAdd } = require("./events/messageReactionAdd");
const { handleRateLimit } = require("./events/rateLimit");

function setupClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  client.once(Events.ClientReady, (readyClient) =>
    handleReady(readyClient, client)
  );
  client.on(Events.MessageReactionAdd, handleMessageReactionAdd);
  client.on("rateLimit", handleRateLimit);

  return client;
}

module.exports = { setupClient };
