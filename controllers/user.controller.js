const User=require('../models/user.model');
const {setUser,getUser} =require('../middlewares/auth');
const cookieParser=require('cookie-parser');

async function handleSingup(req,res){
    const {username,email,password} = req.body;
    const existingUser = await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }else{
        const user=await User.create({
            username:username,
            email:email,
            password:password
        })
        return res.render('login');
    } 
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    const existingUser = await User.findOne({email:email});
    if(!existingUser){
        // return res.status(404).json({message:"User not found"});
        return res.render('login',{
            error:"Incorrect email or password",
        })
    }else{
        if(email== existingUser.email && password==existingUser.password){
            const token=setUser(existingUser);
            res.cookie("uid",token);
            return res.redirect("/");
        }else{
            return res.status(400).json({message:"Incorrect email or password"});
        }
    }
}

async function handleFindUserById(req,res){
    const _id=req.params.id;
    const user=await User.findById({_id});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }else{
        return res.status(200).json({"user":user});
    }
}

module.exports={
    handleSingup,
    handleLogin,
    handleFindUserById
}