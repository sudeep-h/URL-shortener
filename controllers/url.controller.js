const URL=require('../models/url.model');
const shortid=require("shortid");

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({message:"url is required"});
    const shortId=shortid();

    let entry=await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    console.log("entry in generate",entry);
    res.redirect('/');
    // return res.render('home',{
    //     id:shortId
    // })
}

async function handleRedirectURL(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({shortId});
    if(!entry) return res.status(404).json({message:"Not found"});

    await URL.updateOne({shortId},{
        $push:{visitHistory:{timestamp:Date.now()}}}
    )
    const redirectURL=entry.redirectUrl;
    
    res.redirect(redirectURL);
    
}

module.exports={
    handleGenerateNewShortURL,
    handleRedirectURL
}