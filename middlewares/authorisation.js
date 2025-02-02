const {getUser} =require('../service/auth');

function checkUserAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user=null;
    if(!tokenCookie) return next();
    const user=getUser(tokenCookie);
    req.user=user;
    next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect('/api/user/login');
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next(); 
    }
}

module.exports={checkUserAuthentication,restrictTo}