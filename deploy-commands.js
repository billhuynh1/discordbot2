const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');
const { Routes } = require('discord.js')

// const commands = [
// 	new SlashCommandBuilder().setName('tictactoe').setDescription('Play a game of tic tac toe')
// ]
// commands.create({
// 	name: 'ping',
// 	description: 'replies with pong'
// })

const rest = new REST({ version: '10' }).setToken(token);

// rest.put(Routes.applicationCommands(clientId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();