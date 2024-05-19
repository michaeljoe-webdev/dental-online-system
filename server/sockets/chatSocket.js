module.exports = (socket) => {
  socket.on('join_chat', (roomId) => {
    socket.join(roomId);
    console.log(`User joined chat room ${roomId}`);
  });

  socket.on('leave_chat', (roomId) => {
    socket.leave(roomId);
    console.log(`User left chat room ${roomId}`);
  });

  socket.on('send_message', (roomId, message) => {
    socket.to(roomId).emit('receive_message', message);
    console.log(`Message sent to room ${roomId}: ${message}`);
  });
};
  