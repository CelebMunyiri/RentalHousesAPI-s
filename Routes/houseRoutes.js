const express= require('express');
const {verifyToken}=require('../Middlewares/verifyToken');
const { updateHouse, createHouse, getHouses, getHouseById } = require('../Controllers/houseController');

const houseRoute=express.Router();


houseRoute.get('/oneHouse/:id',getHouseById);
houseRoute.post('/newHouse',createHouse);
houseRoute.put('/updateHouse/:houseId',updateHouse);
houseRoute.get('/allhouses',verifyToken,getHouses);

module.exports={houseRoute};