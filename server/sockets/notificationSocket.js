module.exports = (socket) => {
    socket.on('subscribe_notifications', (userId) => {
      socket.join(userId);
      console.log(`User subscribed to notifications for user ${userId}`);
    });
  
    socket.on('unsubscribe_notifications', (userId) => {
      socket.leave(userId);
      console.log(`User unsubscribed from notifications for user ${userId}`);
    });
  
    socket.on('send_notification', (userId, notification) => {
      socket.to(userId).emit('receive_notification', notification);
      console.log(`Notification sent to user ${userId}: ${notification}`);
    });
};
