const express=require('express');
const router=express.Router();
const {handleSingup,handleLogin} = require('../controllers/user.controller');

router.post('/', handleSingup);
router.post('/login',handleLogin);

module.exports=router;
