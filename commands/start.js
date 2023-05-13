const Discord = require('discord.js');

const gm = require("../classes/GameManager.js");

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
            .setDescription(`Player1 (X): <@${(game.player1 || {id:"null"}).id}>; Player2 (O): <@${(game.player2 || {id:"null"}).id}>`)
            .addFields(
                { name: "Game state", value: "Current player: " + game.turn + "\n" + formatGame(game.board) }
            )
            ;

        await interaction.reply({ embeds: [embed] });
    }
}