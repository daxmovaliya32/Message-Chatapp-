const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermodel"
    },
    content:{
        type:String,
        trim:true
    },
    chats:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatmodel"
    }
},
     {timestamps:true}
);

module.exports.Messagemodel = new mongoose.model("Messagemodel",MessageSchema)
