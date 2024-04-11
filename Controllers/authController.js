const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../Models/auth');
const dotenv=require('dotenv');
const {success,error}=require('../Utils/responses')
dotenv.config();




const registerUser = async (req, res) => {
    try {
        const {username,password,email}=req.body
        

       const usersInDB=await User.findOne({$or:[{username},{email}]})

     if(usersInDB){
            res.status(400).send(error("Username Or Email Already Exist, try new Email and username"))
        } else{
            const hashedPassword=await bcrypt.hash(password,8)
            let newUser=await User.create({username,email,password:hashedPassword});
            newUser.save()

            res.status(200).send(success("User Registered Successfully"),newUser);
        }
        
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
        const token =jwt.sign({_id: User._id,email:UserLogin.email},process.env.jwtsecret)

res.status(200).json({token})
    } catch (error) {
        console.error("Login failed");
        return res.status(500).json({message:"Error logging you in",Error:error.message});
    }
}

const updateUserDetals=async(req,res)=>{
    try {
        const userId=req.params.id;
        const detailsToUpdate=req.body;

        const isUserAvailable=await User.findById(userId);

        if(!isUserAvailable){
            return res.status(400).json({message:"This user Does not Exist"});

        } else{
            if(detailsToUpdate.username)isUserAvailable.username=detailsToUpdate.username;
            if(detailsToUpdate.email)isUserAvailable.email=detailsToUpdate.email;

            detailsToUpdate.save;

            return res.status(201).json(success("details updated Succesfully"),detailsToUpdate);
        }
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={registerUser,loginUser,updateUserDetals}