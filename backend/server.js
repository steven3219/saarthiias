const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);

// 1. Connect to MongoDB Atlas
connectDB();

// 2. Global Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json()); // Essential for parsing incoming req.body

// 3. Mount API Routes (Fulfilling Standard Layout API Requirements)
app.use('/api/auth', authRoutes);

// Global Error Handling Middleware (Module 10 / API Standards)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 4. Initialize Socket.io Server
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || "*" }
});

global.activeSockets = new Map();

io.on('connection', (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on('register_user', (userId) => {
    global.activeSockets.set(userId, socket.id);
    console.log(`👤 User ${userId} registered to socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of global.activeSockets.entries()) {
      if (socketId === socket.id) {
        global.activeSockets.delete(userId);
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
});

global.sendRealTimeNotification = (targetUserId, eventName, payload) => {
  const socketId = global.activeSockets.get(targetUserId.toString());
  if (socketId) {
    io.to(socketId).emit('notification', { eventName, payload });
  }
};

// 5. Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🔥 Server executing dynamically on port ${PORT}`);
});