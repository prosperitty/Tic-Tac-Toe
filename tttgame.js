var startButton = document.querySelector("#startButton");
var resetButton = document.querySelector("#resetButton");
var selectBox = document.querySelectorAll(".gameBox");
var symbols = ["X", "O"];
var message = document.querySelector("#message");
var backgroundImage = document.querySelector("#background");
var players = ["player 1","player 2"];
var gameOver = true;
var turn = true;
var waves = [1,2,3,4,5,6,7,8,9]


runFunc();

function runFunc(){
    setButton();
    // setBoxes();
    playerTurn();
    // filledBox();
    reset();  
}



for(var i = 0; i < selectBox.length; i++){
    selectBox[i].style.border = "none";
}




// function setButton() {
//     startButton.addEventListener("click", function(){
//         message.innerHTML = "player 1";
//         backgroundImage.style.background= "#232323";
//         for(var i = 0; i < selectBox.length; i++){
//             selectBox[i].style.border = "";
//             selectBox[i].style.transition = "0.25s";
//         }
//     }); 
// }

function setButton() {
    if(gameOver){
    startButton.addEventListener("click", function(){
        message.innerHTML = players[0];
        backgroundImage.style.background= "#232323";;
        for(var i = 0; i < selectBox.length; i++){
            selectBox[i].style.border = "";
            selectBox[i].style.transition = "0.1s";
        }
        gameOver = false;
    }); 
}
        // } else {
    //     resetButton.addEventListener("click", function(){
    //         for(var i = 0; i < selectBox.length; i++){
    //             selectBox[i].innerHTML = "";
    //         }  
    //         message.innerHTML = players[0];
    //         turn = true;
    //         gameOver = false;
    //     });
    // }
}


// function player1() {;
//     var turns = [1,2];
//     for(var i = 0; i < selectBox.length; i++){
        
//         selectBox[i].addEventListener("click", function(){
//             console.log("clicked");
//             message.innerHTML = players[1];
//             this.innerHTML = symbols[0];
//             console.log(players[1]);
//             return turns[1]; 
//         }); 
//     }   
// }

function playerTurn() {;
    for(var i = 0; i < selectBox.length; i++){
        selectBox[i].addEventListener("click", function(){   
                if(turn === true){ ;
                message.textContent = players[1];
                this.textContent = symbols[0];
                turn = false;
                } 
                else {
                message.textContent = players[0];
                this.textContent = symbols[1];
                turn = true;   
                }
        }); 
    }   
}




// function filledBox(){
//     for(var i = 0; i < selectBox.length; i++){
//         selectBox[i].addEventListener("click", function(){   
//             if(selectBox === symbols[0]){
//             } else {
//             }
//         });
//     } 
// }

function reset() {
    resetButton.addEventListener("click", function(){
        for(var i = 0; i < selectBox.length; i++){
            selectBox[i].innerHTML = "";
        }  
        message.innerHTML = players[0];
        turn = true;
        gameOver = false;
    });
} 



