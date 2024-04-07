const house = require("../Models/house");
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit event for new ticket
  socket.on('newHouse', () => {
    socket.broadcast.emit('newTicket');
  });

  // Emit event for status change
  socket.on('statusChange', () => {
    socket.broadcast.emit('statusChange');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.json());




const createHouse=async(req,res)=>{
    try {
        const {name,cost,description,images,location}=req.body;
        const isHouseinDB=await house.findOne({name});

       if(isHouseinDB){
         return  res.status(401).json({message:"House Already exists, add one that does not exist"});
        }

const newHouse=await house.create({name,cost,description,images,location});

await newHouse.save();

io.emit('house_created', newHouse);
res.status(200).json({message:"House Added succesfully"});
    } catch (error) {
        console.error("There was an error",error);
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
        
        if(updatedHouse.name)theHouse.name=updatedHouse.name
        if(updatedHouse.cost)theHouse.cost=updatedHouse.cost
        if(updatedHouse.description)theHouse.description=updatedHouse.description
        if(updatedHouse.location)theHouse.location=updatedHouse.location
        if(updatedHouse.images)theHouse.images=updatedHouse.images

        await theHouse.save();
        
        io.emit('house_updated', theHouse);
        return res.status(200).json({message:"House details updated as success"});
    } catch (error) {
        console.error("There was an error",error);
        return res.status(500).json({message:"Internal server Error"});
    }
}

const getHouses = async(req,res)=>{
    try {
        const allHouses=await house.find({});

        if(!allHouses) {
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
module.exports={createHouse,updateHouse,getHouses,getHouseById}