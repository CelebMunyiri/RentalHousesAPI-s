const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{
      type:String,
      unique:true,
      required:true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error('Email is invalid');
        }
      }

    },
    password:{type:String,required:true},
    _is_active:{type:Boolean,default:true},
    role:{type:String,required:true,enum:['admin','user','landlord'],dafault:'user'}
  });

module.exports=mongoose.model('users',userSchema)
