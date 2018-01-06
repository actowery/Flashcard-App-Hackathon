console.log("Game logic running");

//Make websocket connection 
var socket = io.connect();


//Query the DOM and get reference to relevant parts of html
var increaseBtn = document.getElementById('increase');
var decreaseBtn = document.getElementById('decrease');
var progressBar2 = document.getElementsByClassName('progress-bar')[1];
     

var p1Percent = 0;
var p2Percent = 0;

var gameOver = false;
var winner = 100;

function increasePercent(){
    console.log("Increase function executing...");
    if(!gameOver) {
        p2Percent++;
        if (p2Percent === winner) {

            //Add class winner to turn score green
            progressBar2.classList.add("winner");

            gameOver = true;
        }
        progressBar2.textContent = p2Percent + "% completed";
    }
    
}

function decreasePercent(){
//To be continued...

}


//Emit events
increaseBtn.addEventListener('click', function(){
    //Send the event down the websocket to server
    socket.emit('increasePercent');
});


//Listen for increase percent and call increase percent function
socket.on('increasePercent', function(){
   increasePercent();
});
