const startButton = document.querySelector(".startButton");
const selectBox = document.querySelectorAll(".grid-box");
const content = document.querySelectorAll('.content');
const message = document.querySelector(".message");

runFunc();

function runFunc(){
    setButton(); 
}

function setButton() {
        startButton.addEventListener("click", function(){
            console.log('test');
            for(var i = 0; i < selectBox.length; i++){
                selectBox[i].style.visibility = 'visible';
                selectBox[i].style.transition = '0.6s';
            }
        }); 
}

const gameBoard = (() => {
    let board = [
    '','','',
    '','','',
    '','',''
    ];
    let marks = ['X', 'O'];
    let gameOver = false;

    
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
            if (
            board[0] === playersMark
            && board[1] === playersMark
            && board[2] === playersMark
            ||
            board[3] === playersMark 
            && board[4] === playersMark 
            && board[5] === playersMark
            ||
            board[6] === playersMark 
            && board[7] === playersMark 
            && board[8] === playersMark
            ||
            board[0] === playersMark
            && board[3] === playersMark
            && board[6] === playersMark
            ||
            board[1] === playersMark
            && board[4] === playersMark
            && board[7] === playersMark
            ||
            board[2] === playersMark
            && board[5] === playersMark
            && board[8] === playersMark
            ||
            board[0] === playersMark 
            && board[4] === playersMark 
            && board[8] === playersMark
            ||
            board[2] === playersMark 
            && board[4] === playersMark 
            && board[6] === playersMark
            ) {
                winner = true
                gameOver = true
                console.log(`${name} is the winner!`);
            }
        }

        return {
            name,
            turn,
            logMark,
            appendMark,
            checkForWinner
        };  
    };

    const player1 = Player('jane', 'X');
    const player2 = Player('doe', 'O');
    player1.turn = true

    const activateListener = () => {
        for (const box of selectBox) {
            box.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[box.dataset.indexNumber] === '') {
                    player1.appendMark(box.dataset.indexNumber);
                    player1.turn = false;
                    player2.turn = true;
                    player1.checkForWinner();
                } else if(!gameOver && player2.turn && board[box.dataset.indexNumber] === '') {
                    player2.appendMark(box.dataset.indexNumber);
                    player1.turn = true;
                    player2.turn = false;
                    player2.checkForWinner();
                }
            }); 
        }
    }

    const displayMark = (i) => {
        selectBox[i].firstChild.textContent = board[i];
    };
 
    return {
        activateListener,
    };
})();

gameBoard.activateListener();




