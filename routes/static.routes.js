const express=require('express');
const router=express.Router();
const URL=require('../models/url.model');

router.get('/',async(req,res)=>{
    const user=req.user;
    if(!user) return res.redirect('/api/user/login');
    const allUrls=await URL.find({createdBy:user._id});
    return res.render('home',{
        urls:allUrls
    });
})

router.get('/api/user/',(req,res)=>{
    res.render('signup');
})

router.get('/api/user/login',(req,res)=>{
    res.render('login');
})

module.exports=router;