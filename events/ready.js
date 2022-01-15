const { get_word } = require("../lib/words");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    d = new Date();
    console.log(`The word for ${d} is ${get_word(d)}`);
  },
};
