const mongoose=require('mongoose');

const houseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    cost:{
        type:Number,
    },
    description:{
        type:String,
        
    },
    images:{type:Array,of:String},
    location:{type:String},
    poster:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    is_vacant:{type:Boolean}
});

module.exports=mongoose.model('houses',houseSchema);