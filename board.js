const MoveError = require("./moveError");

class Board {
    constructor() {
        this.grid = Board.makeGrid();
    }

    isEmptyPos(pos) {
        if (!Board.isValidPos(pos)) {
            //if not an empty board position, is not a valid position since is filled
            throw new MoveError("Is not a valid position!");
        } else {
            //is an empty position so is null
            return (this.grid[pos[0]][pos[1]] === null);
        }
    }

    static makeGrid() {
        const grid = []; //grid is a matrix of 3 by 3

        for (let i = 0; i < 3; i++) { //layout grid template
            grid.push([]);

            for (let j = 0; j < 3; j++) { //set each grid cell as null/empty
                grid[i].push(null);
            }
        }
        return grid;
    }

    static isValidPos(pos) {
        return (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3);
    }
}