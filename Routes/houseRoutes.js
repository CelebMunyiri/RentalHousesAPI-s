const express= require('express');
const {verifyToken}=require('../Middlewares/verifyToken');
const { updateHouse, createHouse, getHouses, getHouseById, removeHouse ,getHousesByPoster} = require('../Controllers/houseController');
const { verifyRoleAsLandlord } = require('../Middlewares/landlord');

const houseRoute=express.Router();


houseRoute.get('/oneHouse/:id',getHouseById);
houseRoute.post('/newHouse',createHouse);
houseRoute.put('/updateHouse/:houseId',verifyRoleAsLandlord,updateHouse);
houseRoute.get('/allhouses',getHouses);
houseRoute.delete('/remove/:id',removeHouse);
houseRoute.get('/poster-houses',getHousesByPoster)

module.exports={houseRoute};