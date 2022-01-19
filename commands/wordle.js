const { SlashCommandBuilder } = require("@discordjs/builders");
const { day_number, get_word, valid_guess } = require("../lib/words");

const players = {};
const answer = get_word(new Date());

const WRONG = 0;
const MOVED = 1;
const CORRECT = 2;

const markers = ["⬛", "🟨", "🟩"];

function try_guess(guess) {
  guess = guess.substring(0, 5).toLowerCase();
  results = Array(5).fill(WRONG);
  a_copy = answer.toLowerCase().split("");
  for (i = 0; i < 5; i++) {
    if (a_copy[i] == guess[i]) {
      results[i] = CORRECT;
      a_copy[i] = "X";
    }
  }
  for (i = 0; i < 5; i++) {
    if (a_copy.includes(guess[i])) {
      results[i] = MOVED;
      a_copy[a_copy.findIndex((a) => a == guess[i])] = "X";
    }
  }
  return results;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordle")
    .setDescription("Plays a game of Wordle")
    .addStringOption((option) =>
      option.setName("word").setDescription("The word to guess")
    ),
  async execute(interaction) {
    guess = interaction.options.getString("word");
    if (!valid_guess(guess)) {
      await interaction.reply({
        content: "Not a valid word: " + guess,
        ephemeral: true,
      });
    } else {
      results = try_guess(interaction.options.getString("word"));
      repl = "Wordle " + day_number(new Date()) + "\n";
      for (r of results) {
        repl = repl + markers[r];
      }
      await interaction.reply({ content: repl, ephemeral: false });
    }
  },
};
