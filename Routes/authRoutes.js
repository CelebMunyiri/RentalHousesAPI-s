const express=require('express');
const { registerUser, loginUser, deActivateAccount } = require('../Controllers/authController');

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/deactivate/:id',deActivateAccount);

module.exports={router}