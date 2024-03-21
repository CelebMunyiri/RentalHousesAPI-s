const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../Models/auth');
const dotenv=require('dotenv');
dotenv.config();


const registerUser = async (req, res) => {
    try {
        const {username,password,email}=req.body
        

      //  const usersDB=await user.findOne({$or:[{username},{email}]})

       // if(usersDB){
       //     res.status(400).send({message:"User Already Exists"})
       // } else{
            const hashedPassword=await bcrypt.hash(password,8)
            let newUser=await User.create({username,email,password:hashedPassword});
            newUser.save()

            res.status(200).send({message:"User Registered Successfully"})
      //  }
        
    } catch (error) {
        return res.status(500).json({Error:error.message})
    }
};

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //finding the user by email
        const UserLogin=await User.findOne({email});

        if(!UserLogin){
            return res.status(401).json({error:"Invalid details"});
        }
        //comparing if passwords match
        const passwordMatch=await bcrypt.compare(password,UserLogin.password);

        if(!passwordMatch){
            return res.status(401).json({error:"Invalid Password"});
        }
        //creating a token
        const token =jwt.sign({_id: User._id,email:UserLogin.email},process.env.jwtSecret)

res.status(200).json({token,UserLogin})
    } catch (error) {
        console.error("Login failed");
        return res.status(500).json({message:"Error logging you in",Error:error.message});
    }
}

module.exports={registerUser,loginUser}