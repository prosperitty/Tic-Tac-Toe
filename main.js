const startButton = document.querySelector(".start-button");
const playerButton = document.querySelector('.player-button');
const aiButton = document.querySelector('.ai-button');
const formButton = document.querySelector('.form-button');
const resetButton = document.querySelector('.reset-button');
const namesForm = document.querySelector('.names-form');
const playerNames = document.querySelectorAll('.players');
const status = document.querySelector('.status');
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
            namesForm.style.opacity = '1';
            namesForm.style.visibility = 'visible'
            gameBoard.activateAiMode();
        });
    };

    const setButton = () => {
        startButton.addEventListener('click', function(){
            startButton.style.opacity = '0';
            playerButton.style.opacity = '1';
            aiButton.style.opacity = '1';
            startButton.style.visibility = 'hidden';
            playerButton.style.visibility = 'visible';
            aiButton.style.visibility = 'visible';
            buttonListeners();
        }); 
    };

    return {
        setButton
    };
})();

const gameBoard = (() => {
    let board = [
    '','','',
    '','','',
    '','',''
    ];
    let gameOver = false;
    let playerName1 = undefined;
    let playerName2 = undefined;

    const Player = (name, mark) => {
        let playersMark = mark; 
        let turn = false;

        const appendMark = (index) => {
            if(board[index] === '') {
                board[index] = playersMark;
                selectBox[index].firstChild.textContent = board[index];
            }
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
                gameOver = true;
                gameStatus.style.transition = 'all 0.5s ease-in';
                gameStatus.textContent = `${name} is the winner!`;
                gameStatus.style.color = `rgb(77, 229, 77)`;
                console.log(`${name} is the winner!`);
            } else if(!board.includes('')) {
                gameOver = true;
                gameStatus.textContent = `tie!`;
                gameStatus.style.color = `orange`;
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

    const displayControl = () => {
        namesForm.style.display = 'none';
        resetButton.style.display = 'inline-block';
        startButton.style.display = 'none';
        grid.style.display = 'grid';
        gameStatus.style.opacity = '1';
        playerButton.style.opacity = '0';
        aiButton.style.opacity = '0';
        gameStatus.style.visibility = 'visible';
        playerButton.style.visibility = 'hidden';
        aiButton.style.visibility = 'hidden';
    }

    const createGame = () => {
        formButton.addEventListener('click', () => {
            playerName1 = namesForm[0].value;
            playerName2 = namesForm[1].value;
            displayControl();
            activate2PlayerMode();
        })
    };

    function minimax(node, depth, maximizingPlayer) {
    
    }

    const randomNum = () => {
        return Math.floor(Math.random() * (selectBox.length - 0) + 0);
    }

    function activateAiMode() {
        displayControl();
        let player1 = Player('Your','X');
        let aiBot = Player('bot','O');
        player1.turn = true;
        gameStatus.textContent = `${player1.name} turn`;
        for (const box of selectBox) {
            function aiPlay() {
                let randomIndex = randomNum();
                if(!gameOver && aiBot.turn && board.includes('')) {
                    if(board[randomIndex] === '') {
                        console.log('entry clear');
                        aiBot.appendMark(randomIndex);
                        player1.turn = true;
                        aiBot.turn = false;
                        gameStatus.textContent = `${player1.name} turn`;
                        aiBot.checkForWinner();
                    } else if(!gameOver && board[randomIndex] !== '') {
                        console.log('not available');
                        aiPlay();
                    }
                }
            }
            box.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[box.dataset.indexNumber] === '') {
                    player1.appendMark(box.dataset.indexNumber);
                    player1.turn = false;
                    aiBot.turn = true;
                    gameStatus.textContent = `Awaiting ${aiBot.name}...`
                    player1.checkForWinner();
                    setTimeout(() => {
                        aiPlay();
                    }, 600);
                } 
            }); 
            resetButton.addEventListener('click', () => {
                board = [
                '','','',
                '','','',
                '','',''
                ];
                gameOver = false
                player1.turn = true
                gameStatus.style.color = `white`
                gameStatus.textContent = `${player1.name} turn`;
                box.firstChild.textContent = board[box.dataset.indexNumber];
            });
        };
    }
 
    function activate2PlayerMode() {
        let player1 = Player(playerName1,'X');
        let player2 = Player(playerName2,'O');
        player1.turn = true;
        gameStatus.textContent = `${player1.name}'s turn`;
        for (const box of selectBox) {
            box.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[box.dataset.indexNumber] === '') {
                    player1.appendMark(box.dataset.indexNumber);
                    player1.turn = false;
                    player2.turn = true;
                    gameStatus.textContent = `${player2.name}'s turn`;
                    player1.checkForWinner();
                } else if(!gameOver && player2.turn && board[box.dataset.indexNumber] === '') {
                    player2.appendMark(box.dataset.indexNumber);
                    player1.turn = true;
                    player2.turn = false;
                    gameStatus.textContent = `${player1.name}'s turn`;
                    player2.checkForWinner();
                }
            }); 
            resetButton.addEventListener('click', () => {
                board = [
                '','','',
                '','','',
                '','',''
                ];
                gameOver = false;
                player1.turn = true;
                gameStatus.style.color = `white`;
                gameStatus.textContent = `${player1.name}'s turn`;
                box.firstChild.textContent = board[box.dataset.indexNumber];
            });
        };
    };

    return {
        activateAiMode,
        createGame,
    };
})();

buttons.setButton(); 

