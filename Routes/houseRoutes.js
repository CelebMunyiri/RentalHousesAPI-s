const express= require('express');
const { updateHouse, createHouse, getHouses } = require('../Controllers/houseController');

const houseRoute=express.Router();

houseRoute.post('/newHouse',createHouse);
houseRoute.put('/updateHouse/:id',updateHouse);
houseRoute.get('/allhouses',getHouses);

module.exports={houseRoute};