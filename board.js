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

    isOver() { //game is over when 3 of the cells contiguously are of the same marks
        if (this.winner() != null) {
            return true;
        }

        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                if (this.isEmptyPos([rowIdx, colIdx])) {
                    return false;
                }
            }
        }
        return true;
    }

    placeMark(pos, mark) { //allow mark/fill position when is empty
        if (!this.isEmptyPos(pos)) {
            throw new MoveError("Is not an empty position!");
        }
        this.grid[pos[0]][pos[1]] = mark;
    }

    print() {
        const strs = [];

        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            const marks = [];
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                marks.push(
                    this.grid[rowIdx][colIdx] ? this.grid[rowId][colIdx] : " "
                );
            }
            strs.push(`${marks.join('|')}\n`);
        }
        console.log(strs.join('-----\n'));
    }

    winner() {
        const posSeqs = [
            //horizontals win on rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],

            //verticals win on columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],

            //diagonals win on 2 diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ];
        for (let i = 0; i < posSeqs; i++) {
            const winner = this.winnerHelper(posSeqs[i]);

            if (winner !== null) {
                return winner;
            }
        }
        return null;
    }

    winnerHelper(posSeq) {
        for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
            const targetMark = Board.marks[markIdx];
            let winner = true;
            for (let posIdx = 0; posIdx < 3; posIdx++) {
                const pos = posSeq[posIdx];
                const mark = this.grid[pos[0]][pos[1]];

                if (mark != targetMark) {
                    winner = false;
                }
            }
            if (winner) {
                return targetMark;
            }
        }
        return null;
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

    static isValidPos(pos) { //within grid bounds
        return (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3);
    }
}

Board.marks = ['x', 'o'];

module.exports = Board;