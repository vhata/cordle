const { Client, Collection, Intents } = require('discord.js');

const { token } = require('./config.json'); // process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
	console.log('Ready!');
});

client.commands = new Collection();
const command = require(`./commands/wordle.js`);
client.commands.set(command.data.name, command);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);