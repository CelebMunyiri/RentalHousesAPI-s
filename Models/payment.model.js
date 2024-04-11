const mongoose=require('mongoose');

const paymentSchema=mongoose.model({
    amount:{
        type:Number,
        required:true
    },
    paid_by:{
        type:String,
        required:true,
        ref:'users'
    },
    confirmation_code:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports=mongoose.model('payments',paymentSchema);