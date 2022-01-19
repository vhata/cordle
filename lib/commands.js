const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guilds, token } = require("../config.json");

const command = require(`../commands/wordle.js`);
cc = new Collection();
cc.set(command.data.name, command);
const commands = [command.data.toJSON()];

const rest = new REST({ version: "9" }).setToken(token);

for (guild of guilds) {
  rest
    // for a global command:  Routes.applicationCommands(clientId),
    .put(Routes.applicationGuildCommands(clientId, guild), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}

module.exports = { commands: cc };
