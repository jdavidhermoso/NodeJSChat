var express = require('express'),
    WebSocketServer = require("ws").Server,
    app = express(),
    server = require('http').createServer(app),
    port = Number(process.env.PORT || 5000),
    clients_counter = 0,
    client_id = 0
    clients = [];

server.listen(port);

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){

    res.sendfile(__dirname+'/index.html');
});

var wss = new WebSocketServer({server:server});

wss.on('connection', function(socket) {
    clients_counter++;
    client_id = clients_counter;

    clients[client_id] = socket;
    wss.id = client_id;



    socket.on('message',function(data){
        wss.clients.forEach(function(client) {
            client.send(data);
        });

    });

    socket.on('close',function(data){
        clients[wss.id]
    });
});
