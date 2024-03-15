const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const util = require('util');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require('dotenv').config();

// Read environment variables from .env file
const mainUrl = process.env.MAIN_URL;

io.on('connection', (socket) => {
    socket.on('sendToken', (token) => {
        console.log(token);
        if (token === "Hash1") {
            socket.emit("receiveResponse", token + " received");
            console.log('Data Received' + token);
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
