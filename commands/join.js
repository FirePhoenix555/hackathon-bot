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
            .setDescription("(players)")
            .addFields(
                { name: "Game state", value: formatGame(game.board) }
            )
            ;

        await interaction.reply({ embeds: [embed] });
    }
}