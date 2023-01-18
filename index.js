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
app.use("/api/user",userroutes)
app.use("/api/user",authroutes)
app.use("/api/chat",chatroutes)


app.listen(port,(error)=>{
    if(error)
      console.log(error);
    console.log("server running on port 8000");
});

