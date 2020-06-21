# My-Chat-App
Sample code:

io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});


How to use
The following example attaches socket.io to a plain Node.JS HTTP server listening on port 3000.

const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);
Standalone
const io = require('socket.io')();
io.on('connection', client => { ... });
io.listen(3000);
