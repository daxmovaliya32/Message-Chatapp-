const bcrypt = require('bcrypt');
const user = require("../models/user");
const jwt = require('jsonwebtoken')
const { sk } = require('../config/config')

module.exports.userlog = async(req,res)=>{
    try {
            email=req.body.email,
            password=req.body.password
        const userdata = await user.findOne({email:email});
        const check = await bcrypt.compare(password,userdata.password) 
        if(check==true)
        {
            const token = jwt.sign({_id:userdata._id.toString()},sk,{expiresIn:"3d"});
            var messages=[];
            messages.push("login successfully");
            messages.push(token);
            return res.json(
                {"message":messages}
            )
        }else{
            var messages=[];
            messages.push("password or email does not match");
            return res.json(
                {"message":messages}
            )
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send("login feild")
    }
}

module.exports.searchuser = async(req,res)=>{
    try {
        const keyword = req.query.search
        ? {
            $or:[
                { name:{$regex:req.query.search,$options:"i"}},
                { email:{$regex:req.query.search,$options:"i"}},
            ]
        }:{};
       const data = await user.find(keyword)
       res.json(data);
        
} catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}