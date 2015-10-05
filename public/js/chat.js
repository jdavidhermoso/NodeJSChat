;(function (w, d) {
    'use strict';
    
var chat = {
    socket:undefined,
    init:function() {

        chat.socket = io.connect('http://localhost:8080');
        var messageForm = d.getElementById('chat-send-message-form'),
            messageSendButton = d.getElementById('chat-send-button'),
            message_input = d.getElementById('chat-message-input');



        messageSendButton.addEventListener('click', function(e){
            e.preventDefault();
            chat.sendMessage(message_input);
        });



        chat.socket.on('newMessage', function(data){

            chat.receiveMessage(data.msg);
        });

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