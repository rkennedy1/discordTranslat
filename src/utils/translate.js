async function translateText(translateClient, text, targetLanguage) {
  console.log(`Translating text: "${text}" to language: "${targetLanguage}"`);

  try {
    let [translations] = await translateClient.translate(text, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log("Translations:", translations);
    return translations[0];
  } catch (error) {
    console.error(
      `Translation API error for text: "${text}", language: "${targetLanguage}"`,
      error
    );
    throw new Error("Translation failed. Please try again later.");
  }
}

module.exports = { translateText };
