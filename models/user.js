const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
},
     {timestamps:true}
);

const Usermodel = new mongoose.model("Usermodel",UserSchema)

module.exports=Usermodel;