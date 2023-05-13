const Discord = require('discord.js');

const gm = require("../game-manager.js");

const formatGame = require("../format-game.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts a new game.')
        ,
    async execute(interaction) {


        let user = interaction.user;

        let { num, game } = gm.addGame(user);


        let embed = new Discord.EmbedBuilder()
            .setTitle("Game " + num)
            .setDescription("(players)")
            .addFields(
                { name: "Game state", value: formatGame(game.board) }
            )
            ;

        await interaction.reply({ embeds: [embed] });
    }
}