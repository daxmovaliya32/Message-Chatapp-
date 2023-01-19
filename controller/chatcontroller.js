const chats = require("../models/chat");
const user = require("../models/user");

module.exports.accesschat = async(req,res)=>{
    const loginuser=req.body.userdata;
    console.log(loginuser._id);
    const {userid} = req.body;
    if(!userid)
    {
        console.log("userid param not sent with reuest")
        return sendStatus(400)
    }

    var ischat= await chats.find({
        isGroupchat:false,
        $and:[
            { users:loginuser._id },
            { users:userid }
        ]
    }).populate("users","-password").populate("latestMessage");

    ischat = await user.populate(ischat,{
        path:"latestMessage.sendar",
        select:"name pic email" 
    });

    if(ischat.length>0)
    {
        res.send(ischat);
    }else{
        var chatdata = {
            Chatname:"sendar",
            isGroupchat:false,
            users:[loginuser._id,userid]
        }
        try {
            const creatchat = await chats.create(chatdata);
            const fullchat = await chats.findOne({_id:creatchat._id}).populate(
                "users",
                "-password"
            )
            res.status(200).send(fullchat);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports.fatchchat = async(req,res)=>{
    try {
        const loginuser=req.body.userdata;

var data = chats.find({users:loginuser._id})
                .populate("users","-password")
                .populate("groupAdmin","-password")
                .populate("latestMessage")
                .sort({updatedAt:-1})
    
     data = await user.populate(data,{
     path:"latestMessage.sendar",
     select:"name pic email" 
     });
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.creategroup = async(req,res)=>{
    try {
        const loginuser=req.body.userdata;
    if(!req.body.Chatname || !req.body.users)
    {
        return res.status(400).send("please fill all feilds");
    }
        var groupusers = req.body.users;
        if(groupusers.length<2)
        {
            return res.status(400).send("group must have gretar than 2 user");
        }
         groupusers.push(loginuser);
         const groupchat = await chats.create({
            Chatname:req.body.Chatname,
            isGroupchat:true,
            users:groupusers,
            groupAdmin:loginuser._id
        })

        const fullgroupchat = await chats.find({_id:groupchat._id}).populate("users","-password").populate("groupAdmin","-password");
        res.status(200).send(fullgroupchat);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.renamegroup = async(req,res)=>{
   try {
    if(!req.body.Chatname)
    {
        return res.status(400).send("please fill all feilds");
    }
    const _id = req.body.chatid;
    const updatedata = await chats.findByIdAndUpdate({_id},{Chatname:req.body.Chatname},{new:true}).populate("users","-password").populate("groupAdmin","-password");
    res.status(200).send(updatedata);
   } catch (error) {
    console.log(error);
   }
}

module.exports.addtogroup = async(req,res)=>{
    try {
     const _id = req.body.chatid;
     const updatedata = await chats.findByIdAndUpdate({_id},{$push:{users:req.body.userid}},{new:true}).populate("users","-password").populate("groupAdmin","-password");
     res.status(200).send(updatedata);
    } catch (error) {
     console.log(error);
    }
 }

module.exports.removegroup = async(req,res)=>{
    try {
     const _id = req.body.chatid;
     await chats.findByIdAndDelete({_id});
     res.status(200).send("group delete successfully");
    } catch (error) {
     console.log(error);
    }
 }

 module.exports.removeuser = async(req,res)=>{
    try {
     const _id = req.body.chatid;
     const updatedata = await chats.findByIdAndUpdate({_id},{$pull:{users:req.body.userid}},{new:true}).populate("users","-password").populate("groupAdmin","-password");
     res.status(200).send(updatedata);
    } catch (error) {
     console.log(error);
    }
 }