const express = require("express");
const routes = express.Router();
const chats = require("../models/chat");
const {protect} = require("../middalware/authmiddalware");
const { accesschat , fatchchat,creategroup, renamegroup, removegroup, addtogroup, removeuser} = require("../controller/chatcontroller");

routes.route("/",).post(protect,accesschat);
routes.route("/",).get(protect,fatchchat);
routes.route("/group").post(protect,creategroup)
routes.route("/rename").patch(protect,renamegroup)
routes.route("/removegroup").delete(protect,removegroup)
routes.route("/removeuserfromgroup").patch(protect,removeuser)
routes.route("/groupadd").patch(protect,addtogroup)

module.exports = routes;