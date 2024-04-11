const express=require('express');
const { chargeClient } = require('../payments/stripe');
const route=express.Router();

route.get('/charge',chargeClient);

module.exports={route};