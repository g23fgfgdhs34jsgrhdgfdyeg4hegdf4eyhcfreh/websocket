const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const util = require('util');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const logFile = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
const logStdout = process.stdout;

console.log = function(d) {
    logFile.write(util.format(d) + '\n');
    logStdout.write(util.format(d) + '\n');
};

io.on('connection', (socket) => {
    socket.on('sendToken', (token) => {
        console.log(token);
        if (token === "Hash1") {
            socket.emit("receiveResponse", token + " received");
        }
     
    });

    socket.conn.on("upgrade", (transport) => {
        console.log(`transport upgraded to ${transport.name}`);
    });
    
    socket.on("disconnect", (reason) => {
        console.log(`disconnected due to ${reason}`);
    });
    
    socket.on("reconnect", (reason) => {
        console.log(`reconnect due to ${reason}`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
