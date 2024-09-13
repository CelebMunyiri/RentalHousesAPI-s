const mongoose=require('mongoose');


const notificationSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    title:{type:String},
    body:{type:String},
    is_deleted:{type:Boolean,default:false}
  });

module.exports=mongoose.model('Notification',notificationSchema)