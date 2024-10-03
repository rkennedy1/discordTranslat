const logger = require("../utils/logger");

function handleRateLimit(info) {
  logger.warn(`Rate limit hit: ${JSON.stringify(info)}`);
}

module.exports = { handleRateLimit };
