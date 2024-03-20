const house = require("../Models/house");


const createHouse=async(req,res)=>{
    try {
        const {name,cost,description}=req.body;
        const isHouseinDB=house.findOne({name});

        if(isHouseinDB){
            res.status(401).json({message:"House Already exists, add one that does not exist"});
        }

const newHouse=await house.create({name,cost,description});

newHouse.save();

res.status(200).json({message:"House Added succesfully"});
    } catch (error) {
        console.error("There was an error",err);
        res.status(500).json({message:"Internal server Error"});
    }
}

const updateHouse=async(req,res)=>{
    try {
        const houseId=req.params.houseId;
        const updatedHouse=req.body;
        const theHouse=await house.findById(houseId);

        if(!theHouse){
            return res.status(404).json({message:"House Does Not Exist"});
        }
        
        if(updatedHouse.name)theHouse.name=updatedHouse.name;
        if(updatedHouse.cost)theHouse.cost=updatedHouse.cost;
        if(updatedHouse.description)theHouse.description=updatedHouse.description;

        await house.save;

        
    } catch (error) {
        console.error("There was an error",err);
        return res.status(500).json({message:"Internal server Error"});
    }
}

const getHouses=async(res)=>{
    try {
        const allHouses=await house.find({});
        console.log(allHouses);
        res.status(200).json(allHouses)
        
    } catch (error) {
        console.error("There was an error",err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={createHouse,updateHouse,getHouses}