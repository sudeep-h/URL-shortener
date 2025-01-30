const express=require('express');
const router=express.Router();
const {handleGenerateNewShortURL,handleRedirectURL}=require('../controllers/url.controller');

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleRedirectURL);

module.exports=router;