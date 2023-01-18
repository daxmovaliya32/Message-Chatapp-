const express = require("express");
const {userloginValidationRules, validatelogin } = require("../config/validator");
const routes = express.Router();
const auth = require("../controller/userauth")

routes.post("/login",[userloginValidationRules(),validatelogin],auth.userlog)

routes.get("/search",auth.searchuser);

module.exports = routes;