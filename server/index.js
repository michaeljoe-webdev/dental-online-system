require('dotenv').config();
const http = require('http');
const express = require('express');
// const socketIO = require('socket.io');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
// const socketRoutes = require('./routes/socketRoutes');

const app = express();
const server = http.createServer(app);
// const io = socketIO(server).use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use(express.json()).use(limiter).use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/dentists', require('./routes/dentistsRoutes'));
app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/slots', require('./routes/slotsRoutes'));

// Socket - for mail notification
// socketRoutes(io);

// Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});