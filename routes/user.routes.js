const express=require('express');
const router=express.Router();
const {handleSingup,handleLogin,handleFindUserById} = require('../controllers/user.controller');

router.post('/', handleSingup);
router.post('/login',handleLogin);
router.get('/:id',handleFindUserById);

module.exports=router;
