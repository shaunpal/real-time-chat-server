const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');
const { addUser, removeUser, getUser, getAllUsers } = require('./users');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(router);
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    
    //Name of room/queue
    const locationRoom = "chatterbox";

    socket.on('join', ({ name, clientid }, callback) => {
        const { user } = addUser({ id: socket.id, name: name, clientid: clientid });
        
        socket.emit('message', { user: user.name, message: `${user.name}, welcome to chatterbox`, color: user.color, client_id: user.clientid , text: ""});
        socket.broadcast.to(locationRoom).emit('message', { user: user.name, message: `${user.name} has joined!`, text: ""});

        socket.join(locationRoom);
        
        io.to(locationRoom).emit('roomData', { users: getAllUsers() })

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        io.to(locationRoom).emit('message', { user: user.name, text: message, color: user.color, client_id: user.clientid });
        io.to(locationRoom).emit('roomData', { users: getAllUsers() });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(locationRoom).emit('message', { user: user.name, message: `${user.name} has left`, text: "", users: getAllUsers() })
        } 
    });
})



server.listen(PORT, () => {
    console.log(`Server running...`);
})