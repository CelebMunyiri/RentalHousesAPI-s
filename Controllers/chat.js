const Chat = require('../Models/chat')
const socketIO = require('socket.io')

const io = socketIO();

const chatModule = {};
chatModule.io = io;

chatModule.io.on("connection", socket=>{
    console.log("connected to server")
    // socket.on("connection",=>{
    //     console.log("connected")
    // });

    socket.on("chatMessage", async data=>{
        const {message,sender,receiver, attachment,roomId} = data;
        const chat = await Chat.create({message,sender,receiver}) 
        await chat.save();
    socket.to(roomId).emit(data)   })

    socket.on('typing',roomId=>{
        socket.to(roomId).emit('typing')
    })
})

module.exports = { chatModule }