module.exports = function formatGame(board) {
    let t = "";
    
    for (let j = 0; j < board[0].length; j++) {
        for (let i = 0; i < board.length; i++) {
            let tile = board[i][j];
            if (tile == 1) t += "[X] ";
            else if (tile == 2) t += "[O] ";
            else if (tile == 0) t += "[ ] ";
        }
        t += "\n";
    }
    
    return t;
}