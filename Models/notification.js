const mongoose=require('mongoose');


const notificationSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    title:{type:String},
    body:{type:String,required:true},
    is_deleted:{type:Boolean,default:false},
    subscription:{type:String}
  });

module.exports=mongoose.model('Notification',notificationSchema)