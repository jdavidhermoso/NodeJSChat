;(function (w, d) {
    'use strict';
    
var chat = {
    socket:undefined,
    host: undefined,
    ws: undefined,
    init:function() {
        chat.host = location.origin.replace(/^http/,'ws');
        chat.ws = new WebSocket(chat.host);

        chat.socket = io.connect('https://nameless-river-8578.herokuapp.com:5000');
        var messageForm = d.getElementById('chat-send-message-form'),
            messageSendButton = d.getElementById('chat-send-button'),
            message_input = d.getElementById('chat-message-input');



        messageSendButton.addEventListener('click', function(e){
            e.preventDefault();
            chat.sendMessage(message_input);
        });



        chat.ws.onmessage = function(event){
            chat.receiveMessage(event.data.msg);
        }


    },
    receiveMessage:function(message) {
        var time = new Date(),
            messages_panel = d.getElementById('chat-messages-panel');

        messages_panel.innerHTML += "<div class='chat-message-container chat-message-in'> <p class='chat-message-time'> "+time.getHours() +":"+time.getMinutes() +" </p><p class='chat-message'>"+message+"</p></div>";

       messages_panel.scrollTop = messages_panel.scrollHeight;

    },
    sendMessage:function(message) {

        if (message.value != "") {
            chat.socket.emit('sendMessage', message.value);
            message.value = "";
        }

    }
};

d.addEventListener('DOMContentLoaded', chat.init, false);
}(window, document));