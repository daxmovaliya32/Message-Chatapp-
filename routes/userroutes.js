const express = require("express");
const { userSignUpValidationRules, validateSignup, userloginValidationRules, validatelogin } = require("../config/validator");
const routes = express.Router();
const reg = require("../controller/reguser")
const auth = require("../controller/userauth")

routes.post("/signup",[userSignUpValidationRules(),validateSignup],reg.reguser)

routes.get("/login",[userloginValidationRules(),validatelogin],auth.userlog)

module.exports = routes;