const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    Chatname:{
        type:String,
        trim:true
    },
    isGroupchat:{
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usermodel"
        }
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Messagemodel"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermodel"
    }
},
     {timestamps:true}
);

const chatmodel = new mongoose.model("chatmodel",chatSchema)

module.exports=chatmodel;