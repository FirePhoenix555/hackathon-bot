const Discord = require('discord.js');

const gm = require("../game-manager.js");

const formatGame = require("../format-game.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins an existing game.')
        .addIntegerOption(option =>
            option.setName("game-index")
                .setDescription("The index of the game you want to join.")
        )
        ,
    async execute(interaction) {

        if (!gm.games.length) {
            await interaction.reply("There are no games!");
            return;
        }

        let user = interaction.user;
        let gi = (interaction.options.get("game-index") || {value: gm.games.length - 1}).value;

        let game = gm.games[gi];
        game.addPlayer(user);


        let embed = new Discord.EmbedBuilder()
            .setTitle("Game " + gi)
            .setDescription(`Player1 (X): <@${(game.player1 || {id:"null"}).id}>; Player2 (O): <@${(game.player2 || {id:"null"}).id}>`)
            .addFields(
                { name: "Game state", value: "Current player: " + game.turn + "\n" + formatGame(game.board) }
            )
            ;

        await interaction.reply({ embeds: [embed] });
    }
}