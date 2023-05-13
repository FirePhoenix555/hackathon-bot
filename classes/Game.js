module.exports = class Game { // the core game class. manages information about the game (duh)
    constructor() {
        // players are initially null, dont worry abt it
        this.player1 = null;
        this.player2 = null;
        this.finished = false;

        // initialize the board
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0; // board 0: no piece is there. 1: player 1 (X) there. 2: player 2 (O) there.
            }
        }

        this.turn = 1; // the game starts at player 1's turn
    }

    addPlayer(player) { // add a player to this game
        if (this.finished) return; // but not if the game is over

        // pick the first available player
        if (!this.player1) this.player1 = player;
        else if (!this.player2) this.player2 = player;
    }

    move(player, position) { // player places tile at position
        if (this.finished) return; // but not if the game is over

        let current = this.board[position.i][position.j];
        if (current != 0) return; // or if the position already has something there
        
        if (player == this.player1 && this.turn == 1) {
            this.board[position.i][position.j] = 1;
            this.turn = 2; // advance the turn
        } else if (player == this.player2 && this.turn == 2) {
            this.board[position.i][position.j] = 2;
            this.turn = 1; // advance the turn
        }

        return 1;
    }

    hasPlayer(player) { // does this game have that player?
        return (player == this.player1 || player == this.player2);
    }

    checkWin() { // has anyone won yet?
        let b = this.board; // for shorthand

        // check all possible 3 in a rows
        let top = b[0][0] && (b[0][0] == b[1][0] && b[1][0] == b[2][0]);
        let mdh = b[0][1] && (b[0][1] == b[1][1] && b[1][1] == b[2][1]); // mid horizontal
        let bot = b[0][2] && (b[0][2] == b[1][2] && b[1][2] == b[2][2]);

        let lef = b[0][0] && (b[0][0] == b[0][1] && b[0][1] == b[0][2]);
        let mdv = b[1][0] && (b[1][0] == b[1][1] && b[1][1] == b[1][2]); // mid vertical
        let rig = b[2][0] && (b[2][0] == b[2][1] && b[2][1] == b[2][2]);

        let di1 = b[0][0] && (b[0][0] == b[1][1] && b[1][1] == b[2][2]); // diagonal 1
        let di2 = b[2][0] && (b[2][0] == b[1][1] && b[1][1] == b[0][2]); // diagonal 2

        if (top || mdh || bot || lef || mdv || rig || di1 || di2) { // someone won!
            
            let player = 0;
            if (top || lef || di1) player = b[0][0];
            else if (mdh || mdv || di2) player = b[1][1];
            else if (bot || rig) player = b[2][2];

            this.finished = true; // game is over

            return player; // return the winning player

        }
        else if (this.boardFull()) {
            this.finished = true;
            return -1; // tie
        }
        else return 0; // not done yet
    }

    boardFull() { // is the board full
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (!this.board[i][j]) return false; // if one spot is empty the board is not full
            }
        }
        return true;
    }
}