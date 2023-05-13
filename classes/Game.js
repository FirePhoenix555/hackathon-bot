module.exports = class Game {
    constructor() {
        this.player1 = null;
        this.player2 = null;

        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
        }

        this.turn = 1;
    }

    addPlayer(player) {
        if (!this.player1) this.player1 = player;
        else if (!this.player2) this.player2 = player;
    }

    move(player, position) {
        let current = this.board[position.i][position.j];
        if (current != 0) return;
        // console.log(this.turn, this.board, this.player1, this.player2, player)
        if (player == this.player1 && this.turn == 1) {
            this.board[position.i][position.j] = 1;
            this.turn = 2;
        } else if (player == this.player2 && this.turn == 2) {
            this.board[position.i][position.j] = 2;
            this.turn = 1;
        }

        return 1;
    }

    hasPlayer(player) {
        return (player == this.player1 || player == this.player2);
    }

    checkWin() {

        let b = this.board;

        let top = b[0][0] && (b[0][0] == b[1][0] && b[1][0] == b[2][0]);
        let mdh = b[0][1] && (b[0][1] == b[1][1] && b[1][1] == b[2][1]); // mid horizontal
        let bot = b[0][2] && (b[0][2] == b[1][2] && b[1][2] == b[2][2]);

        let lef = b[0][0] && (b[0][0] == b[0][1] && b[0][1] == b[0][2]);
        let mdv = b[1][0] && (b[1][0] == b[1][1] && b[1][1] == b[1][2]); // mid vertical
        let rig = b[2][0] && (b[2][0] == b[2][1] && b[2][1] == b[2][2]);

        let di1 = b[0][0] && (b[0][0] == b[1][1] && b[1][1] == b[2][2]); // diagonal 1
        let di2 = b[2][0] && (b[2][0] == b[1][1] && b[1][1] == b[0][2]); // diagonal 2

        if (top || mdh || bot || lef || mdv || rig || di1 || di2) {
            
            let player = 0;
            if (top || lef || di1) player = b[0][0];
            else if (mdh || mdv || di2) player = b[1][1];
            else if (bot || rig) player = b[2][2];

            return player;

        }
        else if (this.boardFull()) return -1;
        else return 0;

        // return 1; // if player 1 win
        // return 2; // if player 2 win
        // return 0; // if no one won
        // return -1; // if tie
    }

    boardFull() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (!this.board[i][j]) return false;
            }
        }
        return true;
    }
}