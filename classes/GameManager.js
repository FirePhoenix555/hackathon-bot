const Game = require("./Game.js");

class GameManager {
    constructor() {
        this.games = [];
    }

    addGame(player) {
        let game = new Game();
        game.addPlayer(player);
        this.games.push(game);
        return {
            num: this.games.length - 1,
            game
        };
    }

    move(player, position) {
        let game = this.getGameFromPlayer(player);
        if (game) {
            return game.move(player, position);
        }
        else return 0;
    }

    addPlayer(player, game=this.games[this.games.length-1]) {
        game.addPlayer(player);
    }

    getGameFromPlayer(player) {
        for (let i = 0; i < this.games.length; i++) {
            let game = this.games[i];
            if (game.hasPlayer(player) && !game.finished) return game;
        }
        return null;
    }
}

const gm = new GameManager();
module.exports = gm;