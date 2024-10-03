const { Translate } = require("@google-cloud/translate").v2;
const logger = require("../utils/logger");

function handleReady(readyClient, client) {
  client.translate = new Translate({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
  });

  (async () => {
    const [projectId] = await client.translate.getProjectId();
    logger.info(`Authenticated as project: ${projectId}`);
  })();

  logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
}

module.exports = { handleReady };
