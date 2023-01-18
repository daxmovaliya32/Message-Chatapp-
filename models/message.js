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
        ref:"Chatmodel"
    }
},
     {timestamps:true}
);

const Messagemodel = new mongoose.model("Messagemodel",MessageSchema)

module.exports=Messagemodel