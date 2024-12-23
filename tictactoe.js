const prompt=require("prompt-sync")()


function makeMove(board,turn){
    while(true){
        const row=prompt("Enter row: ")
        const col=prompt("Enter col: ")
        if(isNaN(row) || row<1 || row>3)    console.log("Invalid row...")
        else if(isNaN(col) || col<1 || col>3)   console.log("Invalid col...")
        else if(board[row-1][col-1]!==" ")    console.log("Invalid position...")
        else{
            board[row-1][col-1]=turn
            break
        }
    }
}
function printBoard(board){
    for(let i=0;i<board.length;i++){
        let rowString=""
        for(let j=0;j<board[i].length;j++){
            rowString+=board[i][j]
            if(j!==board[i].length-1) rowString+=" | "
            if(j===board[i].length-1) {
                console.log(rowString)
                if(i!==board.length-1)  console.log("---------")
            }
        }
        
    }
    
}

function checkWin(board,turn){
    let lines=[
        [[0,0],[0,1],[0,2]], //row 0
        [[1,0],[1,1],[1,2]], //row 1
        [[2,0],[2,1],[2,2]], //row 2
        [[0,0],[1,0],[2,0]], //col 0
        [[0,1],[1,1],[2,1]], //col 1
        [[0,2],[1,2],[2,2]], //col 2
        [[0,0],[1,1],[2,2]], //diagonal 1
        [[0,2],[1,1],[2,0]]  //diagonal 2
    ]
    
    for (let line of lines){
        let win=true
        for(pos of line ){
            const[row,col]=pos
            if(board[row][col]!==turn) {
                win=false 
                break
            }
        }
        if(win)return true
    }
    
    if(!win)return false
}

let turnCount=0;
let turn="X";
let board=[
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
]
let win=false;
printBoard(board)
console.log()
while(turnCount<9){
    console.log(turn,"'s turn.")
    makeMove(board,turn)
    printBoard(board)
    console.log()
    win=checkWin(board,turn)
    if(win) {
        console.log(turn+" has won!")
        break;
    }
    if(turn==="X")turn="O"
    else turn="X"
    turnCount++;
}
if(!win) console.log("It's a tie!")