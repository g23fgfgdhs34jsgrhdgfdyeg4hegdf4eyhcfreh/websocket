const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require('dotenv').config();

// Read environment variables from .env file
const mainUrl = process.env.MAIN_URL;

console.log('url=' + mainUrl)
io.on('connection', (socket) => {
    socket.on('sendToken', async (token) => {
        console.log(token);
             qrUrl=mainUrl + "qrCode/index.php?apiKey=" + token
             const response = await getQrcode(qrUrl);
             socket.emit("receiveResponse", response);
            console.log('Data Received' + response);
           // console.log(' MainURL' + mainUrl); 
        
     
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



// تابع برای ارسال درخواست GET به آدرس mainUrl و ارسال نتیجه به کلاینت
async function getQrcode(mainUrl) {
    try {
        // ارسال درخواست GET به آدرس mainUrl با استفاده از axios
        const response = await axios.get(mainUrl);
        
        // بازگرداندن مقدار دلخواه از پاسخ
        console.log(response.data);
        return response.data;
    } catch (error) {
        // ارسال پیغام خطا به کلاینت اگر در ارسال درخواست یا دریافت پاسخ مشکلی رخ داده باشد
        console.error("Error:", error);
        return 'error';
    }
}




