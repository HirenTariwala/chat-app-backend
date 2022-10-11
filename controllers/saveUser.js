const { chat } = require("../config/_data")

exports.saveMessage = ({message, username}) => {
    chat.push({
        message: message,
        username: username,
        time: +new Date()
    });
}

exports.updateMessage = (time, text) => {
    const newChat = chat.map(message =>  {
        if(message.time === time){
            message.message = text;
            return message;
        }
        return message;
    });
    chat.length = 0;
    chat.push(...newChat);
}

exports.deleteMessage = (time) => {
    const removeIndex = chat.findIndex(el => el.time === time);
    chat.splice(removeIndex, 1);
}

exports.removeUser = (username) => {
    const temp = chat;
    chat.length = 0;
    chat.push(...temp.filter(message => message.username !== username));
}