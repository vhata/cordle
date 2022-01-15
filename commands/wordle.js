const { SlashCommandBuilder } = require("@discordjs/builders");
const { get_word } = require("../lib/words");

const players = {};
const answer = get_word(new Date());

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordle")
    .setDescription("Plays a game of Wordle")
    .addStringOption((option) =>
      option.setName("word").setDescription("The word to guess")
    ),
  async execute(interaction) {
    await interaction.reply({ content: "Wordle!", ephemeral: true });
  },
};
