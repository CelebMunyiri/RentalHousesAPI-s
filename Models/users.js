const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
type:String,
required:true,
unique:true
    },
    username:{type:mongoose.SchemaTypes.String,required:true,unique:true},
    email:{type:mongoose.SchemaTypes.String,unique:true},
    password:{type:mongoose.SchemaTypes.String,required:true},
  })

const users=mongoose.model('user',userSchema)
module.exports={users};