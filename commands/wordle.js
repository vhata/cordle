const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wordle')
		.setDescription('Plays a game of Wordle'),
	async execute(interaction) {
		await interaction.reply('Wordle!');
	},
};