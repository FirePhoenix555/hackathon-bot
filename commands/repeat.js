const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('hi1')
        .setDescription('Archives a single DMP to the database.')
        ,
    async execute(interaction) {
        await interaction.reply("Hi")
    }
}