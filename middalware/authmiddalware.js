const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {sk} = require("../config/config");

const protect = async (req, res, next) => {
  const token=req.headers.token;
//  console.log(token);
  if (token!=null) {
    try {
      //decodes token id
      jwt.verify(token, sk,(error,result)=>{
        if(error){ return res.status(500).json({status:false,massage:"invalid token or expired",data:null}) }
        req.body.userdata=result;
      });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }else{
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };