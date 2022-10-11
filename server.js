const { chat } = require('./config/_data');
const { saveMessage, deleteMessage, removeUser, updateMessage } = require('./controllers/saveUser');

const io = require('socket.io')(3001, {
    cors: {
        origin: ["http://localhost:3000"],// add link of fronted here
    }
});
const sendResponce = (socket) => {
    socket.emit("message_payload", ...chat);
    socket.broadcast.emit("message_payload", ...chat);
}
io.on('connection', socket => {
    socket.on('send_message', (payload) => {
        const message_send = async () => {
            saveMessage({
                message: payload.message,
                username: payload.username
            });
            return chat;
        };
        message_send().then(() => {
            sendResponce(socket);
        });
    });

    socket.on('user_logout', async (payload) => {
        removeUser(payload.username);
        sendResponce(socket);
    });
    socket.on('update_message', async (payload) => {
        const update = async () => {
            updateMessage(payload.time, payload.message);
        }
        update().then(()=> {
            sendResponce(socket);
        })
    });
    socket.on('delete_message', async (payload) => {
        deleteMessage(payload.time);
        sendResponce(socket);
    });
    socket.on('getmessage_paylaod', ()=> {
        sendResponce(socket);
    })
});
