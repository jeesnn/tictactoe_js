//how to play tictactoe game
const Board = require('./board');
const MoveError = require('./moveError');

class Game {
    constructor() { //initialize board and player
        this.board = new Board();
        this.currentPlayer = Board.marks[0];
    }

    playMove(pos) {
        this.board.placeMark(pos, this.currentPlayer);
    }

    promptMove(reader, callback) {
        const game = this; //the game

        this.board.print(); //print out the board
        console.log(`Current Turn: ${this.currentPlayer}`); //current user's turn

        //prompt user to enter/mark a position[row, col] cell
        reader.question('Enter rowIdx: ', rowIdxStr => {
            const rowIdx = parseInt(rowIdxStr);
            reader.question('Enter colIdx: ', colIdxStr => {
                const colIdx = parseInt(colIdxStr);
                callback([rowIdx, colIdx]);
            });
        });
    }
}