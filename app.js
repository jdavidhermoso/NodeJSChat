var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(8080);
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){

    res.sendfile(__dirname+'/index.html');
});



io.sockets.on('connection', function(socket){
    //Every time someone connects to the chat, a socket is created.
    console.log('connected');

    socket.on('sendMessage', function(data) {
        io.socket.emit('newMessage', {msg:data});

    });
});
