var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen();
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){

    res.sendfile(__dirname+'/index.html');
});



io.sockets.on('connection', function(socket){
    //Every time someone connects to the chat, a socket is created.
    socket.on('sendMessage', function(data) {

        io.sockets.emit('newMessage', {msg: data});

    });
});
