const Discord = require('discord.js');
require("dotenv").config();
const { genCommands } = require('./commands-util.js');
require("./register-commands.js");

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.MessageContent] });

client.once(Discord.Events.ClientReady, c => { // when logged in
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN); // login

client.commands = new Discord.Collection();
genCommands(cmd => { // get all commands and add to list here
    client.commands.set(cmd.data.name, cmd);
});

client.on(Discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; // idk what happened

	const command = interaction.client.commands.get(interaction.commandName); // get the command used

    // logging all commands
    let output = (interaction.member.nickname || interaction.user.username) + ":  /" + interaction.commandName + " ";

    for (i in interaction.options.data) {
        let option = interaction.options.data[i];
        output += option.name + ":" + option.value + " ";
    }

    console.log(output);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		let res = await command.execute(interaction); // call that command's execute()
        if (res) { // error
            console.log("[ERROR] " + responseCodes[res]);
            
            let obj = {
                content: responseCodes[res],
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) await interaction.followUp(obj);
            else await interaction.reply(obj);
        }
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});