const logger = require("./logger");

async function translateText(translateClient, text, targetLanguage) {
  logger.info(`Translating text: "${text}" to language: "${targetLanguage}"`);

  try {
    let [translations] = await translateClient.translate(text, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    logger.info(
      `Translated text: "${translations[0]}" to language: "${targetLanguage}"`
    );
    return translations[0];
  } catch (error) {
    logger.error(
      `Translation API error for text: "${text}", language: "${targetLanguage}"`,
      error
    );
    throw new Error("Translation failed. Please try again later.");
  }
}

module.exports = { translateText };
