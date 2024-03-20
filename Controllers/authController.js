const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const user = require('../Models/users');


const registerUser=async(req,res)=>{
    try {
        const userData=req.body;
        const newUser= new user(userData);

        //hashing password
        const salt=await bcrypt.genSalt(8);
        const hashedPassword=await bcrypt.hash(newUser.password,salt);
        newUser.password=hashedPassword;

        await newUser.save();

         res.status(201).json({message:"registration Succesful"});

    } catch (error) {
        console.error("registration is failing",error);
         res.status(500).json({message:"Registration Failed"});
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //finding the user by email
        const User=await user.findOne({email});

        if(!user){
            return res.status(401).json({error:"Invalid details"});
        }
        //comparing if passwords match
        const passwordMatch=await bcrypt.compare(password,User.password);

        if(!passwordMatch){
            return res.status(401).json({error:"Invalid Password"});
        }
        //creating a token
        const token =jwt.sign({userId: user._id,userEmail:user.email},process.env.jwtSecret)

res.status(200).json({token,userId})
    } catch (error) {
        console.error("Login failed");
        return res.status(500).json({message:"Error logging you in"});
    }
}

module.exports={registerUser,loginUser}