// events/rateLimit.js
module.exports = {
  name: "rateLimit",
  execute(client, info) {
    console.warn(`Rate limit hit: ${JSON.stringify(info)}`);
  },
};
