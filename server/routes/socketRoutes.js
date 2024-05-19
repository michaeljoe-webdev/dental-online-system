// const chatSocket = require('../sockets/chatSocket');
// const notificationSocket = require('../sockets/notificationSocket');
const nodemailer = require('../emails/nodemailer');
const mailtrap = require('../emails/mailtrap');

function socketRoutes(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('checkSchedule', (data) => {
        //reserved
        nodemailer.sendMail(email)
        mailtrap.sendMail(email)
    });
  
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
  });
  console.log('Socket.IO server initialized');
};


module.exports = socketRoutes;
