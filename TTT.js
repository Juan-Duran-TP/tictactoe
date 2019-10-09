class Board extends Array{
    constructor(...args){
        super (args);
        this.grid = "";
        this.gameOver = false;
        this.token1 = "";
        this.token2 = "";
        this.initialize()
    }

    initialize(){
        for (let i = 0; i < 9; i++){
            this[i] = " "
        }
        this.redraw()
        //this.print()
    }

    setToken(playerNumber, token){
        if (playerNumber == 1){
            this.token1 = token;
        }
        else {
            this.token2 = token;
        }
    }
    convertRC2Location(row,column){
        return (column - 1) + ((row-1)*3);
    }
    isValidSpot(location){
        if (this[location] === " "){
            return true;
        }
        else {
            return false;
        }
    }
    place(token, location){       //method name, arguement, body, this is an instance method
        if (token === 1){
            this[location] = this.token1;
        }
        else{
            this[location] = this.token2;
        }
        this.redraw();
        // no return results in undefined, return null, return true
        // fluently one could return this
    }

    redraw(){
        this.grid = "";
        for (let i = 0; i < 3; i++){
            this.grid += " " + this[3*i] + " || " + this[3*i+1] + " || " + this[3*i+2] + " \n"
            if (i < 2){
                this.grid += "-------------\n"
            }
        }
        this.grid += "\n\n\n"
        return this.grid;
    }

    print(){
        console.log(this.grid)
    }

    isGameOver(){
        
        return this.gameOver;
    }

    restart(){

    }

}



//*********************************************************************************************************************** */
//*********************************************************************************************************************** */
//*********************************************************************************************************************** */


const board = new Board();

let gameStatus = true;
while (gameStatus){
    console.log("Welcome to Tic-Tac-Toe!\n Player 1, please select your token:");
    // get input
    board.setToken(1,"X");
    console.log("Welcome to Tic-Tac-Toe!\n Player 2, please select your token:");
    // get input
    board.setToken(2,"O");
    // print rules of TTT
    let turnCount = 1;
    let invalid = true;
    let location = 0;
    while (!board.isGameOver()){

        board.print()
        while (invalid){
            // get player location, R/C numbers (1-3)
            // do safety checking to confirm numbers is 1/3
            let row = Math.ceil(Math.random() * 3);
            let col = Math.ceil(Math.random() * 3);
            //console.log(row,col)
            location = board.convertRC2Location(row,col);
            if (board.isValidSpot(location)){
                invalid = false;
            }
        }
        invalid = true;
        if (turnCount%2 === 0){
            board.place(1,location);
        }
        else {
            board.place(2,location);
        }
        if (turnCount === 9){
            break;
        }
        turnCount++;



    }
    board.print()
    gameStatus = false;

}

