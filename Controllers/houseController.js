const house = require("../Models/house");
const dotenv = require('dotenv');
const {success,error}=require('../Utils/responses')
dotenv.config();





const createHouse=async(req,res)=>{
    try {
        const {name,cost,description,images,location,poster}=req.body;
        const isHouseinDB=await house.findOne({name});

       if(isHouseinDB){
         return  res.status(401).json({message:"House Already exists, add one that does not exist"});
        }

const newHouse=await house.create({name,cost,description,images,location});

await newHouse.save();


res.status(201).json({success:true,message:"House Added succesfully"});
    } catch (error) {
        console.error("There was an error",error);
        res.status(500).json({message:"Internal server Error"});
    }
}

const updateHouse=async(req,res)=>{
    try {
        
        const houseId=req.params.houseId;
        const updatedHouse=req.body;
        const theHouse=await house.findByIdAndUpdate(houseId,updatedHouse,{new:true});
        

        // if(!theHouse){
        //     return res.status(404).json({message:"House Does Not Exist"});
        // }
        
        // if(updatedHouse.name)theHouse.name=updatedHouse.name
        // if(updatedHouse.cost)theHouse.cost=updatedHouse.cost
        // if(updatedHouse.description)theHouse.description=updatedHouse.description
        // if(updatedHouse.location)theHouse.location=updatedHouse.location
        // if(updatedHouse.images)theHouse.images=updatedHouse.images

       // await theHouse.save();
        
       
        return res.status(200).json({message:"House details updated as success"});
    } catch (error) {
        console.error("There was an error",error);
        return res.status(500).json({message:"Internal server Error"});
    }
}

const getHouses = async(req,res)=>{
    try {
        let query=house.find({});
        const page=req.query.page*1 || 1;

        const limit=req.query.limit*1 || 10;
      
        
        const skip=(page-1)* limit;
        query=query.skip(skip).limit(limit);
        if(req.query.page){
            let housesCount=await house.countDocuments();
            if(skip>=housesCount){
                throw new Error("Page not found");
            }
        }

        const allHouses=await query;


        if(!allHouses || allHouses.length==0) {
            res.status(404).send({message:"Houses not found"});
        }
        res.status(200).json({allHouses});
        
    } catch (error) {
        console.error("There was an error",error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
};
const getHouseById=async(req,res)=>{
    try {
        const houseid=req.params.id;
        const theRequestedHouse=await house.findById(houseid);
        
        if(!theRequestedHouse){
        return res.status(404).json({message:"The Requested House Does not exist"});
        } 
        res.json(theRequestedHouse);
    } catch (error) {
        console.error(error);
     res.status(500).json({message:"Internal Server Error!"});
     console.log(error.message);
    }
}
const removeHouse=async(req,res)=>{
    try{
const id=req.params.id;

const deletedHouse=await house.findByIdAndDelete(id);
if(!deletedHouse) {
    res.status(404).send({message:"House not found"});
}
res.status(200).json({message:"House deleted successfully"});
    } catch(err){
console.error(err.message);
res.status(500).json({message:"Failed to delete house"});
    }
}
module.exports={createHouse,
    updateHouse,
    getHouses,
    getHouseById,
removeHouse
}