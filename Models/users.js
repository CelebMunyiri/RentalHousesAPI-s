const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
type:String,
required:true,
unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            // Basic email format validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`,
        },
      },
      password: {
        type: String,
        required: true,
      },
    }, { timestamps: true
    
})

const users=mongoose.model('users',userSchema)
module.exports={users};