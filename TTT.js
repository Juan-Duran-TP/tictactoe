class Board extends Array{
    constructor(...args){
        super (args);
        this.initialize()
    }

    initialize(){
        this.grid = "";
        this.gameOver = false;
        this.token1 = "X";
        this.token2 = "O";
        this.winner = "";
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
    place(player, location){       //method name, arguement, body, this is an instance method
        if (player === 1){
            this[location] = this.token1;
        }
        else{
            this[location] = this.token2;
        }
        this.redraw();
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
        console.log("Congratulations to Player",this.winner,"for winning!")
        return this.winner;
    }




}
  




//*********************************************************************************************************************** */
//*********************************************************************************************************************** */
//*********************************************************************************************************************** */
const board = new Board();
let turn = 1;
let cell = document.getElementById('1')
for (let i = 0; i < 9; i++){
    cell = document.getElementById(i.toString());
    cell.style.cursor = 'pointer';
    cell.onclick = function() {
        if (board.isGameOver() || turn > 9){
            Swal.fire({
                type: 'error',
                title: "The game is over! You can't change any of these spaces!",
                animation: true,
                customClass: {
                popup: 'animated tada'
                }
            });
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
                    const winner = board.getWinner();
                    document.getElementById('status').innerHTML = "<p><b><i>Player " + winner +", has won!<i><b></p>"
                    document.getElementById('status').style.color = "purple";
                    document.getElementById('status').style.color = "purple";
                    Swal.fire({
                        title: "Player " + winner +" has won!",
                        animation: true,
                        customClass: {
                        popup: 'animated tada'
                        }
                    });
                }
                else if ( turn === 10){
                    document.getElementById('status').innerHTML = "<p><b><i>The game has ended in a tie!<i><b></p>"
                    document.getElementById('status').style.color = "purple";
                    document.getElementById('status').style.color = "purple";
                    Swal.fire({
                        title: 'The game has ended in a tie!',
                        animation: true,
                        customClass: {
                          popup: 'animated tada'
                        }
                      });
                
                }
            }
        }
    };    
}

let reset = document.getElementById("reset");
reset.style.cursor = 'pointer';
reset.onclick = function() {
    console.log("Game Reset")
    turn = 1;
    board.initialize();
    let cellReset = document.getElementById("0")
    for (let i = 0; i < 9; i++){
        
        cellReset = document.getElementById(i.toString());
        cellReset.style.backgroundColor = 'turquoise';
        cellReset.innerHTML = "<p>&nbsp;&nbsp;&nbsp; <p>"
        document.getElementById('status').innerHTML = "<p>Player X, it is your turn...</p>"
        document.getElementById('status').style.color = "black";
        //cellReset.style.visibility = "hidden"
        //cells[i].style.visibility = 'hidden'
    }//console.log('worked?')
};






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

