const Discord = require('discord.js');

const gm = require("../game-manager.js");

const formatGame = require("../format-game.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('move')
        .setDescription('Makes a move in a game you\'ve joined.')
        .addIntegerOption(option =>
            option.setName("x-pos")
                .setDescription("The horizontal position you'd like to move in. [starting from the left at 0]")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("y-pos")
                .setDescription("The vertical position you'd like to move in. [starting from the top at 0]")
                .setRequired(true)
        )
        ,
    async execute(interaction) {


        let user = interaction.user;

        let pos = {
            i: interaction.options.get("x-pos").value,
            j: interaction.options.get("y-pos").value
        };

        if (pos.i < 0 || pos.i > 2 || pos.j < 0 || pos.j > 2) {
            await interaction.reply("Invalid index");
            return;
        }

        let res = gm.move(user, pos);
        if (!res) {
            await interaction.reply("oops");
            return;
        }

        let game = gm.getGameFromPlayer(user);

        let embed = new Discord.EmbedBuilder()
            .setTitle("Game " + gm.games.indexOf(game))
            .setDescription("(players)")

        let r = game.checkWin();
        if (r > 0) {
            embed.addFields(
                { name: "Game state", value: "Winner: player " + r}
            )
        } else if (r < 0) {
            embed.addFields(
                { name: "Game state", value: formatGame(game.board) }
            );
        } else {
            embed.addFields(
                { name: "Game state", value: "Tie game!" }
            );
        }

        await interaction.reply({ embeds: [embed] });
    }
}