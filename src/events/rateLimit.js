function handleRateLimit(info) {
  console.warn(`Rate limit hit: ${JSON.stringify(info)}`);
}

module.exports = { handleRateLimit };
