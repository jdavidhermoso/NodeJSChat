var chat = {
    socket:undefined,
    init:function() {

        chat.socket = io.connect();
        var messageForm = document.getElementById('chat-send-message-form');
        var messageSendButton = document.getElementById('chat-send-button');
        var message_input = document.getElementById('chat-message-input');

       

        messageSendButton.addEventListener('click', function(e){
            chat.sendMessage(message_input);
        });



        chat.socket.on('newMessage', function(data){

            chat.receiveMessage(data.msg);
        });

    },
    receiveMessage:function(message) {
        var time = new Date();
        var messages_panel = document.getElementById('chat-messages-panel');

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
