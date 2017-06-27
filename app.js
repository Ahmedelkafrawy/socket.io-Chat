var express = require("express");
var app =  express();
var path = require("path");


var server = require("http").createServer(app);

// set login users array

var users = [];
// obtain socket.io lib
var io = require("socket.io").listen(server);

var index = require('./routes/index');

//set views and public folders
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ser views engine
app.set('view engine', 'ejs');


// listen to the server port 3000

server.listen(3000);

app.use('/',index);

// get message from user  and publish it

io.sockets.on("connection",function(socket){

  socket.on("new user",function(data,callback){
    if(users.indexOf(data) != -1){
        callback(false);
    }else{
        callback(true);
        socket.nickname = data ;
        users.push(socket.nickname);
        io.emit("users" , users);
    }

  });  

  socket.on("messagae to server",function(data){

    io.emit("send message from server", { mess: data,name : socket.nickname}); //sending messagt to every one including me

    /*
    send message to every one except me
    socket.broadcast.emit("send message from server")

    */
  });
  socket.on("disconnect",function(data){
      
        if(!socket.nickname) return;
        users.splice(users.indexOf(socket.nickname) , 1);
        io.emit("users" , users);

  });
}); 