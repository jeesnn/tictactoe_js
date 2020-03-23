const MoveError = require("./moveError");

class Board {
    constructor() {
        this.grid = Board.makeGrid();
    }

    isEmptyPos(pos) {
        if (!Board.isValidPos(pos)) {
            //if not a valid board position
            throw new MoveError("Is not a valid position!");
        } else {
            //is a valid board position so set to empty not filled position
            return (this.grid[pos[0]][pos[1]] === null);
        }
    }
}