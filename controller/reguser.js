const bcrypt = require('bcrypt');
const user = require("../models/user");

module.exports.reguser = async(req,res)=>{
    try {
            // console.log("hih");
            let name=req.body.name;
            let email=req.body.email;
            let password=req.body.password;
            let conpass =req.body.confirmpassword;
            let userdata;
            const da = await user.findOne({email:email});
            if(da)
            {
                var messages=[];
         messages.push("email already exist");
         return res.json({
         "message":messages
         })
            }
         if(password==conpass)
         {
             const bpass = await bcrypt.hash(password,10);
             userdata = new user({
             name:name,
             email:email,
             password:bpass,
             pic:req.body.pic
         })
         const userdetails = await userdata.save();
         var messages=[];
         messages.push("registration done");
         return res.json({
         "message":messages
         })
         }else{
            var messages=[];
           messages.push("password dont match");
            return res.json({
                "message":messages        
              });
         }
    }catch (error) {
        res.status(400).json(error);
        // console.log(error);
    }
}

