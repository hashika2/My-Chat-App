const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const router = require('./router');

const app = express();

app.use(cors());
app.use(router);



server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));