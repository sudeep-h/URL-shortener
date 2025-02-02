const {getUser} =require('./auth');

async function restrictToLoggedInUserOnly(req,res,next){
    const userId=req.cookies.uid;

    if(!userId) return res.redirect('/api/user/login');
    const user=getUser(userId);
    if(!user) return res.redirect('/api/user/login');

    req.user=user;
    next();

}

async function checkAuth(req,res,next){
    const userId=req.cookies.uid;
    const user=getUser(userId);
    req.user=user;
    next();

}

module.exports={restrictToLoggedInUserOnly,checkAuth}