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

    run(reader, gameCompletionCallback) {
        this.promptMove(reader, move => { //prompt user/current player to play a move
            try {
                this.playMove(move);
            } catch (e) {
                if (e instanceof MoveError) {
                    console.log(e.msg);
                } else {
                    throw e;
                }
            }

            if (this.isOver()) { //when game is over print result
                this.board.print();
                if (this.winner()) {
                    console.log(`${this.winner()} has won!`);
                } else {
                    console.log('NO ONE WINS!');
                }
                gameCompletionCallback();
            } else {
                //continue loop
                this.run(reader, gameCompletionCallback);
            }
        });
    }
    swapTurn() { //swap turns between current player
        if (this.currentPlayer === Board.marks[0]) {
            this.currentPlayer = Board.marks[1];
        } else {
            this.currentPlayer = Board.marks[0];
        }
    }
}