const Discord = require('discord.js');
const { genCommands } = require('./commands-util.js');

require("dotenv").config();

let commands = [];
genCommands(cmd => {
	commands.push(cmd.data.toJSON());
});

// Registering commands
const rest = new Discord.REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Discord.Routes.applicationCommands(process.env.CLIENTID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();