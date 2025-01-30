const URL=require('../models/url.model');
const shortid=require("shortid");

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({message:"url is required"});
    const shortId=shortid(8);

    let entry=await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
    })
    res.status(201).json({message:"success",entry});
}

async function handleRedirectURL(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory:{timestamp:Date.now()}
    }})
    res.redirect(entry.redirectUrl);

}

module.exports={
    handleGenerateNewShortURL,
    handleRedirectURL
}