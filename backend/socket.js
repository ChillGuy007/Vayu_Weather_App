const socketio = require('socket.io');

let io;

function initSocket(server) {
  io = socketio(server, {
    cors: { origin: "*" }
  });

  io.on('connection', (socket) => {
    console.log("User connected");
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIO };