const Chat = require('../Models/chat')
const socketIO = require('socket-io')

const io = socketIO();

const chatModule = {};
chatModule.io = io;

chatModule.io.on("connection",socket=>{
    console.log("connected to server")
    // socket.on("connection",=>{
    //     console.log("connected")
    // });

    socket.on("chatMessage",data=>{
        const {text, attachment,roomId} = data; 
    socket.to(roomId).emit(data)   })
})

module.exports = { chatModule }