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
        let turn = false;

        const appendMark = (index) => {
            if(board[index] === '') {
                board[index] = mark;
                selectBox[index].firstChild.textContent = board[index];
            }
        };

        const checkForWinner = () => {
            if (
            board[0] === mark
            && board[1] === mark
            && board[2] === mark
            ||
            board[3] === mark 
            && board[4] === mark 
            && board[5] === mark
            ||
            board[6] === mark 
            && board[7] === mark 
            && board[8] === mark
            ||
            board[0] === mark
            && board[3] === mark
            && board[6] === mark
            ||
            board[1] === mark
            && board[4] === mark
            && board[7] === mark
            ||
            board[2] === mark
            && board[5] === mark
            && board[8] === mark
            ||
            board[0] === mark 
            && board[4] === mark 
            && board[8] === mark
            ||
            board[2] === mark 
            && board[4] === mark 
            && board[6] === mark
            ) {
                return 10;
            } else if(!board.includes('') && !gameOver) {
                return 0;
            }
        }

        const confirmWinner = () => {
            if(checkForWinner()) {
                displayWinner(name);
                return gameOver = true;

            } else if (!board.includes('')) {
                displayTie();
                return gameOver = true;
            }
        }

        return {
            name,
            turn,
            mark,
            appendMark,
            confirmWinner,
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

    const displayTie = () => {
        gameStatus.textContent = `tie!`;
        gameStatus.style.color = `orange`;
        console.log('board is full, its a tie!');
    }

    const displayWinner = (name) => {
        gameStatus.style.transition = 'all 0.5s ease-in';
        gameStatus.textContent = `${name} is the winner!`;
        gameStatus.style.color = `rgb(77, 229, 77)`;
        console.log(`${name} is the winner!`);
    }

    const player1Turn = () => {
        player1.turn = true;
        player2.turn = false;
        gameStatus.textContent = `${player1.name}'s turn`;
    }

    const player2Turn = () => {
        player1.turn = false;
        player2.turn = true;
        gameStatus.textContent = `${player2.name}'s turn`;
    }

    const resetBoard = () => {
        board = [
            '','','',
            '','','',
            '','',''
            ];
        gameOver = false;
        player1.turn = true;
        gameStatus.style.color = `white`;
        gameStatus.textContent = `${player1.name}'s turn`;
        selectBox.forEach(e => {
            e.firstChild.textContent = board[e.dataset.indexNumber];
        }); 
    }

    const createGame = () => {
        formButton.addEventListener('click', () => {
            playerName1 = namesForm[0].value;
            playerName2 = namesForm[1].value;
            displayControl();
            activate2PlayerMode();
        })
    };

    function minimax(b, depth, maximizingPlayer) {
        let playerScore = player1.checkForWinner();
        let aiScore = player2.checkForWinner();

        if(playerScore === 10) {
            return depth - playerScore;
        } 
        if(aiScore === 10) {
            return aiScore - depth; 
        } 
        if(playerScore === 0 || aiScore === 0) {
            return 0;
        }

        if (maximizingPlayer) {
            let best = -Infinity;
            b.forEach((e,i) => {
                if (e === '') {
                    b[i] = player2.mark;
                    let score = minimax(b,depth-1,false);
                    best = Math.max(best,score);
                    b[i] = '';
                }
            });
            return best;
        } else {
            let best = Infinity;
            b.forEach((e,i) => {
                if (e === '') {
                    b[i] = player1.mark;
                    let score = minimax(b,depth-1,true);
                    best = Math.min(best,score);
                    b[i] = '';
                }
            });
            return best;
        }
    }

    function findBestMove(b) {
        let bestVal = -Infinity;
        let bestMove = undefined;

        b.forEach(function(e,i) {
            if (e === '') {
                b[i] = player2.mark;
                let score = minimax(b,0,false);
                b[i] = '';
                if (score > bestVal) {
                    bestVal = score;
                    bestMove = i;
                }
            }
        });
        console.log(`the value of the best move is ${bestVal}`)
        return player2.appendMark(bestMove);
    }
    
    const randomNum = () => {
        return Math.floor(Math.random() * (selectBox.length - 0) + 0);
    }

    function activateAiMode() {
        displayControl();
        player1 = Player('Your','X');
        player2 = Player('bot','O');
        player1.turn = true;
        gameStatus.textContent = `${player1.name} turn`;
        // function aiRandomPlay() {
        //     let randomIndex = randomNum();
        //     if(!gameOver && player2.turn && board.includes('')) {
        //         if(board[randomIndex] === '') {
        //             player2.appendMark(randomIndex);
        //             player1Turn();
        //             player2.confirmWinner();       
        //         } else if(!gameOver && board[randomIndex] !== '') {
        //             aiRandomPlay();
        //         }
        //     }
        // }
        function aiSmartPlay() {
            if(!gameOver && player2.turn && board.includes('')) {
                findBestMove(board)
                player1Turn();
                player2.confirmWinner();
            }
        }
        selectBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    gameStatus.textContent = `Awaiting ${player2.name}...`
                    player1.confirmWinner();
                    setTimeout(() => {
                        aiSmartPlay();
                    }, 600);
                } 
            }); 
        });
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
    }
 
    function activate2PlayerMode() {
        player1 = Player(playerName1,'X');
        player2 = Player(playerName2,'O');
        player1.turn = true;
        gameStatus.textContent = `${player1.name}'s turn`;
        selectBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    player1.confirmWinner();
                } else if(!gameOver && player2.turn && board[i] === '') {
                    player2.appendMark(i);
                    player1Turn();
                    player2.confirmWinner();
                }
            }); 
        });
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
    };

    return {
        activateAiMode,
        createGame,
    };
})();

buttons.setButton(); 

