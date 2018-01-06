var express = require("express");
var socket = require("socket.io");

//App setup

var app = express();

var server = app.listen(process.env.PORT, function(){
    console.log('listening to requests on port ' + process.env.PORT)
});

//Static files
app.use(express.static('public'));

//Socket setup
//Invoking the function, takes a param(the server we want to work with)
var io = socket(server);

//Listen for when connection to socket from browser is made
//Once connection is made, fire off a callback function
//Param-socket: each client will have it's own socket
io.on('connection', function(socket){
   console.log('Made socket connection...', socket.id) //This will log the socket id just to show they are unique connections

    //Listen for data from the client
    socket.on('chat', function(data){
        
       //Send the data out to all the websockets so all clients recieve it
       io.sockets.emit('chat', data);
    });
    
        //Listen for increase Percent
        socket.on('increasePercent', function(){
        //Send data to all websockets
        io.sockets.emit('increasePercent');
    })
    
});


//Card database stuff
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/flashcards");
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// import schema
const Schema = mongoose.Schema;

// create schema for flash cards
const CardSchema = new Schema({
   word: {
       type: String,
       required: true
   },
   description: {
       type: String,
       required: true
   },
   image: String
});

// create 'cards' model and connect it to CardSchema
mongoose.model('cards', CardSchema);