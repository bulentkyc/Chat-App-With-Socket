const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

    //When a user connects, we create a new uniq nick name 
    //and emmit
    socket.on('nick', nick => {
        if (nick) {
            socket.emit('nickName', nick);
            console.log(nick + ' connected!');
        } else {
            let nickName = 'Guest' + Date.now();
            console.log(nickName + ' connected!');
            socket.emit('nickName', nickName);
        }
    });

    


    socket.on('chat message', (message) => {
        console.log(message);
        io.emit('chat msg', message);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

server.listen(port, () => console.log(`Server started on port ${port}`));