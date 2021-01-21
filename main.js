const startButton = document.querySelector(".start-button");
const playerButton = document.querySelector('.player-button')
const aiButton = document.querySelector('.ai-button')
const formButton = document.querySelector('.form-button');
const resetButton = document.querySelector('.reset-button');
const namesForm = document.querySelector('.names-form');
const playerNames = document.querySelectorAll('.players');
const arrows = document.querySelectorAll('.arrows');
const status = document.querySelector('.status')
const gameStatus = document.querySelector('.game-status')
const selectBox = document.querySelectorAll(".grid-box");
const grid = document.querySelector('.grid-container');
const content = document.querySelectorAll('.content');
const message = document.querySelector(".message");

const buttons = (() => {
    const buttonListeners = () => {
        playerButton.addEventListener('click', function() {
            namesForm.style.opacity = '1';
            namesForm.style.visibility = 'visible'
            gameBoard.createGame();
        });
        aiButton.addEventListener('click', function() {
            console.log('click')
        });
    };

    const setButton = () => {
        startButton.addEventListener('click', function(){
            startButton.style.opacity = '0';
            startButton.style.visibility = 'hidden';
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
    let gameOver = false;
    let name1 = undefined;
    let name2 = undefined;

    
    const Player = (name, mark) => {
        let playersMark = mark; 
        let turn = false;
        let winner = false

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
                status.style.transition = 'all 0.5s ease-in'
                status.textContent = `${name} is the winner!`
                status.style.color = `rgb(77, 229, 77)`
                console.log(`${name} is the winner!`);
            } else if(!board.includes('') && !winner) {
                status.textContent = `tie!`
                status.style.color = `orange`
                console.log('board is full, its a tie!');
            }
        }

        return {
            name,
            turn,
            appendMark,
            checkForWinner
        };  
    };

    const createGame = () => {
        formButton.addEventListener('click', () => {
            name1 = namesForm[0].value;
            name2 = namesForm[1].value;
            namesForm.style.display = 'none';
            gameStatus.style.opacity = '1';
            gameStatus.style.visibility = 'visible';
            resetButton.style.display = 'inline-block';
            startButton.style.display = 'none';
            playerButton.style.opacity = '0';
            playerButton.style.visibility = 'hidden';
            aiButton.style.visibility = 'hidden';
            aiButton.style.opacity = '0';
            grid.style.display = 'grid';
            activateListener();
        })
    };

    function activateListener() {
        let player1 = Player(name1,'X');
        let player2 = Player(name2,'O');
        player1.turn = true;
        status.textContent = `${player1.name}'s turn`;
        for (const box of selectBox) {
            box.addEventListener("click", function(){  
                console.log(box)
                if(!gameOver && player1.turn && board[box.dataset.indexNumber] === '') {
                    player1.appendMark(box.dataset.indexNumber);
                    player1.turn = false;
                    player2.turn = true;
                    status.textContent = `${player2.name}'s turn`;
                    player1.checkForWinner(box.dataset.indexNumber);
                } else if(!gameOver && player2.turn && board[box.dataset.indexNumber] === '') {
                    player2.appendMark(box.dataset.indexNumber);
                    player1.turn = true;
                    player2.turn = false;
                    status.textContent = `${player1.name}'s turn`;
                    player2.checkForWinner(box.dataset.indexNumber);
                }
            }); 
            resetButton.addEventListener('click', () => {
                gameOver = false
                player1.turn = true
                status.style.color = `white`
                status.textContent = `${player1.name}'s turn`;
                board = [
                    '','','',
                    '','','',
                    '','',''
                    ];
                box.firstChild.textContent = board[box.dataset.indexNumber];
            });
        };
    };

    return {
        createGame,
    };
})();



