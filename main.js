const startButton = document.querySelector(".startButton");
const selectBox = document.querySelectorAll(".grid-box");
const content = document.querySelectorAll('.content');
const message = document.querySelector(".message");
var gameOver = true;
var turn = true;

runFunc();

function runFunc(){
    setButton(); 
}

function setButton() {
    if(gameOver){
        startButton.addEventListener("click", function(){
            console.log('test');
            for(var i = 0; i < selectBox.length; i++){
                selectBox[i].style.visibility = 'visible';
                selectBox[i].style.transition = '0.6s';
            }
            gameOver = false;
        }); 
    }
}

// function playerTurn() {;
//     for(var i = 0; i < selectBox.length; i++){
//         selectBox[i].addEventListener("click", function(){   
//                 if(turn === true){ ;
//                 this.firstChild.textContent = 'x';
//                 turn = false;
//                 } 
//                 else {
//                 this.firstChild.textContent = 'x';
//                 turn = true;   
//                 }
//         }); 
//     }   
// }

const gameBoard = (() => {
    let board = [
    '','','',
    '','','',
    '','',''
    ];
    let marks = ['X', 'O'];
    
    const Player = (name, mark) => {
        let playersMark = mark; 
        let turn = false;
        let winner = false

        const logMark = () => {
            console.log(`${player} has chosen ${playersMark}`)
        };

        const appendMark = (index) => {
            board[index] = playersMark;
            displayMark(index);
            return board[index];
        };

        const checkForWinner = () => {
            console.log(board);
        }

        return {
            name,
            turn,
            logMark,
            appendMark,
        };  
    };

    const player1 = Player('jane', 'X');
    const player2 = Player('doe', 'O');
    player1.turn = true

    const activateListener = () => {
        for (const box of selectBox) {
            box.addEventListener("click", function(){  
                if(player1.turn === true && board[box.dataset.indexNumber] === '') {
                    player1.appendMark(box.dataset.indexNumber);
                    player1.turn = false;
                    player2.turn = true;
                } else if(player2.turn === true && board[box.dataset.indexNumber] === '') {
                    player2.appendMark(box.dataset.indexNumber);
                    player1.turn = true;
                    player2.turn = false;
                }
            }); 
        }
    }

    const displayMark = (i) => {
        selectBox[i].firstChild.textContent = board[i];
    };
 
    return {
        activateListener,
        player1,
        player2,
    };
})();

gameBoard.activateListener();




