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
}