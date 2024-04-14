const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const {success,error}=require('../Utils/responses')

const verifyToken= async(req,res,next)=>{
try{
const token=req.headers['token'];

if(!token){
    return res.status(401).json(error("No token provided"));
} else{
    const decodedData=jwt.verify(token,process.env.jwtsecret)

    req.info=decodedData;
    next();
}



} catch(err){
    console.error(err.message);
    res.status(500).json({message:"Internal Server Error"});
}

}

module.exports={verifyToken}