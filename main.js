const startButton = document.querySelector(".start-button");
const playerButton = document.querySelector('.player-button')
const aiButton = document.querySelector('.ai-button')
const selectBox = document.querySelectorAll(".grid-box");
const grid = document.querySelector('.grid-container');
const content = document.querySelectorAll('.content');
const message = document.querySelector(".message");


const buttons = (() => {
    const buttonListeners = () => {
        playerButton.addEventListener('click', function() {
            gameBoard.activateListener();
            grid.style.display = 'grid';
        });
        aiButton.addEventListener('click', function() {
            console.log('clicked');
        });
    };

    const setButton = () => {
        startButton.addEventListener('click', function(){
            console.log('test');
            startButton.style.display = 'none';
            playerButton.style.opacity = '1';
            playerButton.style.visibility = 'visible';
            aiButton.style.visibility = 'visible';
            aiButton.style.opacity = '1';
            buttonListeners();
        }); 
    };

    return {
        setButton
    };
})();

buttons.setButton(); 



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
            selectBox[index].firstChild.textContent = board[index];
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
            } else if(!board.includes('') && !winner) {
                console.log('board is full, its a tie!');
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
                    player1.checkForWinner(box.dataset.indexNumber);
                } else if(!gameOver && player2.turn && board[box.dataset.indexNumber] === '') {
                    player2.appendMark(box.dataset.indexNumber);
                    player1.turn = true;
                    player2.turn = false;
                    player2.checkForWinner(box.dataset.indexNumber);
                }
            }); 
        }
    }
 
    return {
        activateListener,
    };
})();

gameBoard.activateListener();




