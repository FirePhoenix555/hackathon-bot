module.exports = function formatGame(board) {
    let t = "";
    
    for (let j = 0; j < board[0].length; j++) {
        for (let i = 0; i < board.length; i++) {
            let tile = board[i][j];
            if (tile == 1) t += "[X] "; // if player 1's tile, add X
            else if (tile == 2) t += "[O] "; // if player 2's tile, add O
            else if (tile == 0) t += "[ ] "; // if empty, add (space)
        }
        t += "\n"; // separate rows with new line
    }
    
    return "`" + t + "`"; // turn to monospace
}