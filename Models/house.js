const mongoose=require('mongoose');

const houseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    cost:{
        type:Number,
        required:true

    },
    description:{
        type:String,
        required:false
    }
});

module.exports=mongoose.model('houses',houseSchema);