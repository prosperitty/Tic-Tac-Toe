const startButton = document.querySelector(".start-button");
const playerButton = document.querySelector('.player-button');
const aiButton = document.querySelector('.ai-button');
const formButton = document.querySelector('.form-button');
const resetButton = document.querySelector('.reset-button');
const namesForm = document.querySelector('.names-form');
const gameStatus = document.querySelector('.game-status')
const gridBox = document.querySelectorAll('.grid-box');
const grid = document.querySelector('.grid-container');

const displayController = (() => {
    startButton.addEventListener('click', function(){
        startButton.style.opacity = '0';
        startButton.style.visibility = 'hidden';
        playerButton.style.opacity = '1';
        playerButton.style.visibility = 'visible';
        aiButton.style.opacity = '1';
        aiButton.style.visibility = 'visible';
        buttonListeners();
    }); 
    const buttonListeners = () => {
        playerButton.addEventListener('click', function(e) {
            namesForm.style.opacity = '1';
            namesForm.style.visibility = 'visible';
            gameBoard.createGame(e);
        });
        aiButton.addEventListener('click', function(e) {
            gameBoard.createGame(e);
        });
    };
    const displayTie = (gameOver) => {
        if(gameOver) {
            gameStatus.textContent = `tie!`;
            gameStatus.style.color = `orange`;
            console.log('board is full, its a tie!');
        }
    }
    const displayWinner = (name,gameOver) => {
        if(gameOver) {
            gameStatus.style.transition = 'all 0.5s ease-in';
            gameStatus.textContent = `${name} is the winner!`;
            gameStatus.style.color = `rgb(77, 229, 77)`;
            console.log(`${name} is the winner!`);
        }
    }

    return {displayTie, displayWinner}
})();

const gameBoard = (() => {
    let board = ['','','',
                 '','','',
                 '','',''];
    let gameOver = false;
    let player1 = undefined
    let player2 = undefined
    let name1 = undefined;
    let name2 = undefined;

    const Player = (name, mark) => {
        let turn = false;
        function appendMark(index) {
            if(board[index] === '') {
                board[index] = mark;
                gridBox[index].firstChild.textContent = board[index];
            }
        };

        function getScore() {
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

        function checkForWinner() {
            if(getScore()) {
                gameOver = true;
                displayController.displayWinner(name,gameOver);

            } else if (!board.includes('')) {
                gameOver = true;
                displayController.displayTie(gameOver);
            }
        }

        return {
            name,
            turn,
            mark,
            appendMark,
            checkForWinner,
            getScore
        };  
    };

    const displayBoard = () => {
        namesForm.style.display = 'none';
        resetButton.style.display = 'inline-block';
        startButton.style.display = 'none';
        playerButton.style.display = 'none';
        aiButton.style.display = 'none';
        grid.style.display = 'grid';
        gameStatus.style.opacity = '1';
        gameStatus.style.visibility = 'visible';
    }

    const createGame = (button) => {
        if(button.target.className === 'player-button') {
            formButton.addEventListener('click', () => {
                name1 = namesForm[0].value;
                name2 = namesForm[1].value;
                displayBoard();
                activate2PlayerMode();
            });     
        } else if(button.target.className === 'ai-button') {
            displayBoard();
            activateAiMode();
        }
    };

    const player1Turn = () => {
        player1.turn = true;
        player2.turn = false;
        gameStatus.textContent = `${player1.name} turn`;
    }

    const player2Turn = () => {
        player1.turn = false;
        player2.turn = true;
        gameStatus.textContent = `${player2.name} turn`;
    }

    const resetBoard = () => {
        board = ['','','',
                 '','','',
                 '','',''];
        gameOver = false;
        player1.turn = true;
        gameStatus.style.color = `white`;
        gameStatus.textContent = `${player1.name} turn`;
        gridBox.forEach((e,i) => {
            e.firstChild.textContent = board[i];
        }); 
    }

    function minimax(b,depth,maximizingPlayer) {
        let playerScore = player1.getScore();
        let aiScore = player2.getScore();

        if(playerScore === 10) {
            return depth - playerScore;
        } else if(aiScore === 10) {
            return aiScore - depth; 
        } else if(playerScore === 0 || aiScore === 0) {
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
        return Math.floor(Math.random() * (gridBox.length - 0) + 0);
    }

    // function aiRandomPlay() {
    //     let randomIndex = randomNum();
    //     if(!gameOver && player2.turn && board.includes('')) {
    //         if(board[randomIndex] === '') {
    //             player2.appendMark(randomIndex);
    //             player1Turn();
    //             player2.checkForWinner();       
    //         } else if(!gameOver && board[randomIndex] !== '') {
    //             aiRandomPlay();
    //         }
    //     }
    // }

    function aiSmartPlay() {
        if(!gameOver && player2.turn && board.includes('')) {
            findBestMove(board)
            player1Turn();
            player2.checkForWinner();
        }
    }

    function activateAiMode() {
        player1 = Player('Your','X');
        player2 = Player('bot','O');
        player1Turn();
        gridBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    gameStatus.textContent = `Awaiting ${player2.name}...`
                    player1.checkForWinner();
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
        player1 = Player(name1,'X');
        player2 = Player(name2,'O');
        player1Turn();
        gridBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    player1.checkForWinner();
                } else if(!gameOver && player2.turn && board[i] === '') {
                    player2.appendMark(i);
                    player1Turn();
                    player2.checkForWinner();
                }
            }); 
        });
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
    };

    return {createGame};
})();