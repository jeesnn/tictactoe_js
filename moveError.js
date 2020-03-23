const MoveError = function (msg) {
    this.msg = msg;
};

module.exports = MoveError;

//MoveError is a vanilla Object for now but should be an inheritance
//MoveError really should  be a child class of the built in Error object provided
//by JS