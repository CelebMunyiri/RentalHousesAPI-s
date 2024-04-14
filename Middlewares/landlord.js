const User = require('../Models/auth');

async function verifyRoleAsLandlord(req,res,next){

        const userId  = req.headers['user-id'];

        const isUserLandLord=await User.findById(userId);
        console.log(isUserLandLord);
        if(isUserLandLord.role=='landlord'){
            
            next();
        } else{
            res.status(404).json({message:"Un authorized access"});
        }
          
         
    
   
}

module.exports={verifyRoleAsLandlord}