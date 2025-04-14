// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const connection = require('./connect_db/db');


// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const projectRoutes = require('./routes/project')
// const notificationRoutes = require('./routes/notification')
// const documentRoutes = require('./routes/document')
// const discussionRoutes = require('./routes/discussion')
// const reviewRoutes = require('./routes/review')

// dotenv.config();
// const app = express();

// // Database Connection
// connection(process.env.MONGO_URI);

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// app.use(cors());
// app.use(morgan('dev')); 
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/user',userRoutes)
// app.use('/api/project',projectRoutes)
// app.use('/api/notification',notificationRoutes)
// app.use('/api/document',documentRoutes);
// app.use('/api/discussion',discussionRoutes)
// app.use('/api/reviews',reviewRoutes)

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running at port: ${PORT}`);
// });
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./connect_db/db');
const http = require('http'); // Import http module to enable socket.io
const { Server } = require('socket.io'); // Import socket.io

// Import the Message model and User model (for ObjectId validation)
const Message = require('./models/message');
const User = require('./models/user');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const notificationRoutes = require('./routes/notification');
const documentRoutes = require('./routes/document');
const discussionRoutes = require('./routes/discussion');
const reviewRoutes = require('./routes/review');
const messageRoutes = require('./routes/message')

dotenv.config();
const app = express();

// Database Connection
connection(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/discussion', discussionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/message',messageRoutes)

// Setup HTTP server to use socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

// Socket.IO for Real-Time Messaging
io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);

  // Fetch chat history when a user connects (optional)
  socket.emit('chat history', []); // Replace with actual data

  // Listen for incoming messages and save them to the database
  socket.on('chat message', async (msg) => {
    console.log('📝 New message:', msg);

    // Find sender and receiver as User documents (ensure ObjectId references are valid)
    try {
        console.log(msg.sender,msg.receiver)
      const sender = await User.findOne({ username: msg.sender }); // Find sender by username (or ID)
      const receiver = await User.findOne({ username: msg.receiver }); // Find receiver by username (or ID)

      if (!sender || !receiver) {
        console.log('Sender or receiver not found.');
        return;
      }

      // Create a new message and save to the database
      const newMessage = new Message({
        text: msg.text,
        sender: sender._id, // Store ObjectId of the sender
        receiver: receiver._id, // Store ObjectId of the receiver
        type: msg.type,
        attachments: msg.attachments,
        status: 'sent',
      });

      const savedMessage = await newMessage.save(); // Save the message to the DB

      // Broadcast the saved message to all connected clients
      io.emit('chat message', savedMessage);

      console.log('Message saved to database:', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// Set server to listen on the defined port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
