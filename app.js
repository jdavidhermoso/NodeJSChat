var express = require('express'),
    WebSocketServer = require("ws").Server,
    app = express(),
    server = require('http').createServer(app),
    port = Number(process.env.PORT || 5000);

server.listen(port);

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){

    res.sendfile(__dirname+'/index.html');
});

var wss = new WebSocketServer({server:server});

wss.on('connection', function(socket){
    //Every time someone connects to the chat, a socket is created.
    socket.on('sendMessage', function(data) {

        wss.emit('newMessage', {msg: data});

    });
});
