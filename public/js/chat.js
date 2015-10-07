;(function (w, d) {
    'use strict';
    
var chat = {

    host: undefined,
    ws: undefined,
    init:function() {
        chat.host = location.origin.replace(/^http/,'ws');
        chat.ws = new WebSocket(chat.host);


        var messageForm = d.getElementById('chat-send-message-form'),
            messageSendButton = d.getElementById('chat-send-button'),
            message_input = d.getElementById('chat-message-input');



        messageSendButton.addEventListener('click', function(e){
            e.preventDefault();

            chat.ws.send(message_input.value);

        });

        chat.ws.onmessage = function(message){


            chat.receiveMessage(message.data);
        }


    },
    receiveMessage:function(message) {
        var time = new Date(),
            messages_panel = d.getElementById('chat-messages-panel');

        messages_panel.innerHTML += "<div class='chat-message-container chat-message-in'> <p class='chat-message-time'> "+time.getHours() +":"+time.getMinutes() +" </p><p class='chat-message'>"+message+"</p></div>";

       messages_panel.scrollTop = messages_panel.scrollHeight;

    }
};

d.addEventListener('DOMContentLoaded', chat.init, false);
}(window, document));