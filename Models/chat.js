const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('chat',chatSchema);