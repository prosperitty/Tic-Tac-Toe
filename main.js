const startButton = document.querySelector(".start-button");
const playerButton = document.querySelector('.player-button');
const aiButton = document.querySelector('.ai-button');
const formButton = document.querySelector('.form-button');
const resetButton = document.querySelector('.reset-button');
const namesForm = document.querySelector('.names-form');
const playerNames = document.querySelectorAll('.players');
const status = document.querySelector('.status');
const gameStatus = document.querySelector('.game-status')
const selectBox = document.querySelectorAll('.grid-box');
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
    let player1 = undefined
    let player2 = undefined
    let playerName1 = undefined;
    let playerName2 = undefined;

    const Player = (name, mark) => {
        let playersMark = mark; 
        let turn = false;
        let win = false;

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
                return true;
            } else if(!board.includes('') && !gameOver) {
                gameOver = true;
                gameStatus.textContent = `tie!`;
                gameStatus.style.color = `orange`;
                console.log('board is full, its a tie!');
                return false;
            }
        }

        return {
            name,
            turn,
            win,
            num,
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

    function isMovesLeft() {
        let bool = undefined
        board.forEach((e) => {
            if (e == '') {
                bool = true;
            } else {
                bool = false;
            }
        }) 
        return bool;
    }

    function getScore(playerWin, opponentWin) {
        if (playerWin) {
            return 10;
        } else if (opponentWin) {
            return -10;
        } else {
            return 0;
        }
    }

    function minimax(b, depth, maximizingPlayer) {
        let score = getScore(b, player1.win, player2.win)

        if (score === 10) {
            return score;
        }
        if(score === -10) {
            return score;
        }
        if(isMovesLeft() === false) {
            return 0;
        }

        if (maximizingPlayer) {
            let best = -Infinity
            b.forEach((e,i) => {
                if (e === '') {
                    e = 'O';
                    let score = minimax(b,depth + 1,false);
                    e = '';
                    best = max(score,best);
                }
            });
            return best;
        } else {
            let best = Infinity;
            b.forEach(e => {
                if (e === '') {
                    e = 'X';
                    let score = minimax(b, depth + 1, true);
                    e = '';
                    best = min(score, best);
                }
            });
            return best;
        }
    }

    function findBestMove(b) {
        let bestVal = -Infinity;
        let bestMove;

        b.forEach(function(e,i) {
            if (e === '') {
                e = 'O';
                let score = minimax(board,0,false);
                e = '';
                if (score > bestVal) {
                    bestVal = score;
                    bestMove = {i};
                }
            }
        });
        console.log(`the value of the best move is ${bestVal}`)
    }

    // let besttt = findBestMove(board);
    // console.log('the optimal move is:')
    

    const randomNum = () => {
        return Math.floor(Math.random() * (selectBox.length - 0) + 0);
    }

    function activateAiMode() {
        displayControl();
        player1 = Player('Your','X');
        player2 = Player('bot','O');
        player1.turn = true;
        gameStatus.textContent = `${player1.name} turn`;
        function aiPlay() {
            let randomIndex = randomNum();
            if(!gameOver && player2.turn && board.includes('')) {
                if(board[randomIndex] === '') {
                    console.log('entry clear');
                    player2.appendMark(randomIndex);
                    player1.turn = true;
                    player2.turn = false;
                    gameStatus.textContent = `${player1.name} turn`;
                    player2.win = player2.checkForWinner();
                } else if(!gameOver && board[randomIndex] !== '') {
                    console.log('not available');
                    aiPlay();
                }
            }
        }
        selectBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player1.turn = false;
                    player2.turn = true;
                    gameStatus.textContent = `Awaiting ${player2.name}...`
                    player1.win = player1.checkForWinner();
                    setTimeout(() => {
                        aiPlay();
                    }, 600);
                } 
            }); 
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
            selectBox.forEach(e => {
                e.firstChild.textContent = board[e.dataset.indexNumber];
            }) 
        });
    }
 
    function activate2PlayerMode() {
        player1 = Player(playerName1,'X');
        player2 = Player(playerName2,'O');
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

