var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(8080);
app.get('/',function(req,res){
    console.log('aa');
    res.sendfile(__dirname+'/index.html');
});
