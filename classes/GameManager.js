const Game = require("./Game.js");

class GameManager { // manage all the games going on
    constructor() {
        this.games = [];
    }

    addGame(player) { // make a new game!
        let game = new Game();
        game.addPlayer(player); // and add this player to it
        this.games.push(game);
        return {
            num: this.games.length - 1,
            game
        };
    }

    move(player, position) { // player places tile at position
        let game = this.getGameFromPlayer(player);
        if (game) {
            return game.move(player, position);
        }
        else return 0;
    }

    addPlayer(player, game=this.games[this.games.length-1]) { // add player to game. default to most recent game if nothing
        game.addPlayer(player);
    }

    getGameFromPlayer(player) { // find the first game someones in
        for (let i = 0; i < this.games.length; i++) {
            let game = this.games[i];
            if (game.hasPlayer(player) && !game.finished) return game; // unless it's finished
        }
        return null;
    }
}

const gm = new GameManager();
module.exports = gm;