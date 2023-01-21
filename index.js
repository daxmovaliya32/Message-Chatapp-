const express = require("express");
const cors = require("cors");
const app = express();
const { port } = require("./config/config");
const mongodb = require("./config/conn");
mongodb(); //database
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const userroutes = require("./routes/userroutes");
const authroutes = require("./routes/authroute");
const chatroutes = require("./routes/chatroute");
const messageroutes = require("./routes/messageroute");
const { Socket } = require("socket.io");
app.use("/api/user",userroutes)
app.use("/api/user",authroutes)
app.use("/api/chat",chatroutes)
app.use("/api/message",messageroutes)


const server = app.listen(port,(error)=>{
    if(error)
      console.log(error);
    console.log("server running on port 8000");
});

// socketio for chat app
const io = require("socket.io-client");

const sio = require("socket.io")(server,{
  pingTimeout : 60000,
  cors:{
    origin:"http://localhost:5000"
  }
})

sio.on("connection",(socket)=>{
  console.log("connection success for connectin socket.io ");
  socket.on('setup',(userdata)=>{
    socket.join(userdata._id);
    socket.emit("connected")
  })

  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log("user joined room:"+ room);
  })
})




