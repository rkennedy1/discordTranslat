const { Translate } = require("@google-cloud/translate").v2;

function handleReady(readyClient, client) {
  client.translate = new Translate({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
  });

  (async () => {
    const [projectId] = await client.translate.getProjectId();
    console.log(`Authenticated as project: ${projectId}`);
  })();

  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
}

module.exports = { handleReady };
