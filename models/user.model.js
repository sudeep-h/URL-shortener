const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        require:true,
        default:"Normal"
    }
},{timestamps:true});

const User=mongoose.model('user',userSchema);

module.exports=User;