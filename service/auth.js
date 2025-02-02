const jwt = require('jsonwebtoken');

const secret='SecretKey$123@4686';

function setUser(user){
    return jwt.sign(
        {
        _id:user._id,
        email:user.email,
        role:user.role
        },
        secret);
}

function getUser(token){
    return jwt.verify(token,secret);
}

module.exports={
    setUser,
    getUser
}