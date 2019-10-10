class Board extends Array{
    constructor(...args){
        super (args);
        this.grid = "";
        this.gameOver = false;
        this.token1 = "X";
        this.token2 = "O";
        this.initialize()
        this.winner = "";
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
        console.log(this.grid);
    }

    isGameOver(){
        // check token1
        if (this.threeInRow(this.token1)){
            this.winner = this.token1;
            this.gameOver = true;
        }
        else if( this.threeInRow(this.token2)){
            this.winner = this.token2;
            this.gameOver = true;
        }

        if(this.gameOver){
            console.log("Congratulations to Player",this.winner,"for winning!")
        }
        return this.gameOver;
    }
    
    threeInRow(token){
        let win = false;
        // row check
        let count = 0;
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(token === this[i*3+j]) {
                    count++;
                }
            }
            if (count === 3){
                win = true;
            }
            count = 0;
            // column check
            for (let j = 0; j <3; j++){
                if(token === this[j*3+i]){
                    count++;
                }
            }
            if (count === 3){
                win = true;
            }
            count = 0;
        }
        // diagonal check
        if ((token === this[0] && token === this[4] && token === this[8] ) || ( token === this[2] && token === this[4] && token === this[6])){
            win = true;
        }
        return win;
    }

    restart(){

    }

    getWinner(){
        return this.winner;
    }

}



//*********************************************************************************************************************** */
//*********************************************************************************************************************** */
//*********************************************************************************************************************** */
const board = new Board();
let turn = 1;
let something = document.getElementById('1')
for (let i = 0; i < 9; i++){
    something = document.getElementById(i.toString());
    something.style.cursor = 'pointer';
    something.onclick = function() {
        if (board.isGameOver()){
            alert("The game is over! You can't change any of these spaces!")
        }
        else {
            if (this.style.backgroundColor != 'red'){
                
                this.style.backgroundColor = 'red';
                if (turn%2 === 0){
                    this.innerHTML = "<p>O</p>"
                    board.place(0,this.id)
                    document.getElementById('status').innerHTML = "<p>Player X, it is your turn...</p>"
                }
                else{
                    this.innerHTML = "<p>X</p>"
                    board.place(1,this.id)
                    document.getElementById('status').innerHTML = "<p>Player O, it is your turn...</p>"
                }
                turn++;
                board.print()
                if (board.isGameOver()){
                    document.getElementById('status').innerHTML = "<p>Player " + board.getWinner() +", has won!</p>"
                    document.getElementById('status').style.color = "purple";
                    alert("The game is over and Player " + board.getWinner() + " has won!")
                }
            }
        }
    };    
}



// let gameStatus = true;
// while (gameStatus){
//     console.log("Welcome to Tic-Tac-Toe!\n Player 1, please select your token:");
//     // get input
//     board.setToken(1,"X");
//     console.log("Welcome to Tic-Tac-Toe!\n Player 2, please select your token:");
//     // get input
//     board.setToken(2,"O");
//     // print rules of TTT
//     let turnCount = 1;
//     let invalid = true;
//     let location = 0;
//     while (!board.isGameOver()){

//         board.print()
//         while (invalid){
//             // get player location, R/C numbers (1-3)
//             // do safety checking to confirm numbers is 1/3
//             let row = Math.ceil(Math.random() * 3);
//             let col = Math.ceil(Math.random() * 3);
//             //console.log(row,col)
//             location = board.convertRC2Location(row,col);
//             if (board.isValidSpot(location)){
//                 invalid = false;
//             }
//         }
//         invalid = true;
//         if (turnCount%2 === 0){
//             board.place(1,location);
//         }
//         else {
//             board.place(2,location);
//         }
//         if (turnCount === 9){
//             break;
//         }
//         turnCount++;



//     }
//     board.print()
//     gameStatus = false;

// }

