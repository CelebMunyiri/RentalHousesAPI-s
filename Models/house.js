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
        required:true
    },
    images:{type:Array,of:String},
    location:{type:String,required:true}
});

module.exports=mongoose.model('houses',houseSchema);