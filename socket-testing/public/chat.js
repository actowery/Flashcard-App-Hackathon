//Make websocket connection 
var socket = io.connect();

//Query the DOM and get reference to relevant parts of html

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

//Emit events
btn.addEventListener('click', function(){
    var data = {
        message: message.value,
        handle: handle.value
    }
    
    //Send the event down the websocket to server
    socket.emit('chat', data);
    
});

//Listen for events and output the data recieved from server to the DOM
socket.on('chat', function(data){
    output.innerHTML += "<p><strong>" + data.handle+ ':</strong>'+ data.message + "</p>"; //handle is the user's name
})