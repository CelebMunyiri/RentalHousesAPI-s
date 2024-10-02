const Chat = require('../Models/chat');
const socketIO = require('socket.io');

const chatModule = {};
chatModule.io = socketIO();  // Initialize socket.io

let onlineUsers = new Map();  // Track online users

chatModule.io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user joining a chat room
    socket.on('joinRoom', ({ userId, roomId }) => {
        onlineUsers.set(userId, socket.id);  // Map userId to socketId
        socket.join(roomId);  // Join the chat room
        console.log(`${userId} joined room ${roomId}`);
        
        // Notify others in the room that the user is online
        socket.to(roomId).emit('userOnline', { userId });
    });

    // Listen for chat messages
    socket.on('chatMessage', async (data) => {
        const { message, sender, receiver, roomId } = data;
        
        // Save the chat message in the database
        const chat = await Chat.create({ message, sender, receiver });
        console.log(data.message)
        await chat.save();

        // Emit the message to others in the room
        socket.to(roomId).emit('receiveMessage', data);
    });

    // Listen for typing event
    socket.on('typing', ({ roomId, userId }) => {
        socket.to(roomId).emit('typing', { userId });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key);  // Remove user from the online list
            }
        });

        // Optionally, emit an event to notify others of user disconnection
    });
});



// Fetch all messages between two users
const getMessages = async (req, res) => {
    const { sender, receiver } = req.query;

    try {
        const chats = await Chat.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ createdAt: 1 });  // Sort by message creation time

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
};

// Save a new chat message
const saveMessage = async (req, res) => {
    const { message, sender, receiver } = req.body;

    try {
        const newChat = new Chat({ message, sender, receiver });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};


module.exports = { chatModule,getMessages,saveMessage };
