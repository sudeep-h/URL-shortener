const express=require('express');
const router=express.Router();
const URL=require('../models/url.model');
const { restrictTo } = require('../middlewares/authorisation');


router.get('/',async(req,res)=>{
    const user=req.user;
    const allUrls=await URL.find({createdBy:user._id});
    return res.render('home',{
        urls:allUrls,
    });
})

router.get('/api/user/',(req,res)=>{
    res.render('signup');
})

router.get('/api/user/login',(req,res)=>{
    res.render('login');
})

router.get('/api/admin/',restrictTo(["Admin"]),async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('adminhome',{
        urls:allUrls
    })
})


module.exports=router;