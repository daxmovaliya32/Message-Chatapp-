const express = require("express");
const routes = express.Router();
const chats = require("../models/message");
const {protect} = require("../middalware/authmiddalware");
const { sendmessage, allmessage } = require("../controller/messagecontroller");

routes.route("/",).post(protect,sendmessage);
routes.route("/",).get(protect,allmessage);

module.exports = routes;