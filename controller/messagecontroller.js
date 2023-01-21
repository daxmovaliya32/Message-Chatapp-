
const {Messagemodel} = require("../models/message");
const chat = require("../models/chat");
const user = require("../models/user");
const io = require("socket.io-client");
const endpoint = "http://localhost:5000";
const socket = io(endpoint);
module.exports.sendmessage = async(req,res)=>{
   
    const{chatid,content} = req.body;
    if(!chatid || !content)
    {
        res.status(400).send({message:"please write an message..."})
    }
    const loginuser = req.body.userdata;
    try {
        const message = new Messagemodel({
            sender:loginuser._id,
            content:content,
            chats:chatid
        })
         var messagedata = await message.save();
        messagedata = await messagedata.populate("sender","name pic");
        messagedata = await messagedata.populate("chats")
        messagedata = await user.populate(messagedata,{
            path:"chats.users",
            select:"name pic email"
        })

        await chat.findByIdAndUpdate({_id:chatid},{
            latestMessage:messagedata
        })
        socket.emit('new message',messagedata);
        res.status(200).send(messagedata)

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports.allmessage = async(req,res)=>{

    try {
        socket.emit('join chat',req.body.userdata._id);
        
        var message = await Messagemodel.find({chats:req.params.chatid})
        .populate("sender","name pic")
        .populate("chats")
        res.status(200).send(message);
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
 
}