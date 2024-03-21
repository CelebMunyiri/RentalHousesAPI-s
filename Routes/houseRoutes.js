const express= require('express');
const { updateHouse, createHouse, getHouses, getHouseById } = require('../Controllers/houseController');

const houseRoute=express.Router();


houseRoute.get('/oneHouse/:id',getHouseById);
houseRoute.post('/newHouse',createHouse);
houseRoute.put('/updateHouse/:id',updateHouse);
houseRoute.get('/allhouses',getHouses);

module.exports={houseRoute};