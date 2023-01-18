const { check, validationResult } = require("express-validator");


const userSignUpValidationRules =()=>{
    return [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Invalid email").not().isEmpty().isEmail().normalizeEmail(),
        check("password", "Please enter a password with 4 or more characters")
          .not()
          .isEmpty()
          .isLength({ min: 4 }),
      ];
    }

    const userloginValidationRules =()=>{
      return [
          check("email", "Invalid email").not().isEmpty().isEmail().normalizeEmail(),
          check("password", "Please enter a password with 4 or more characters")
            .not()
            .isEmpty()
            .isLength({ min: 4 }),
        ];
      }

const validateSignup = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
          messages.push(error.msg);
        });
        // return res.redirect("/api/user/signup");
          return res.json({
          "message":messages        
        });
      }
      next();
    };

    const validatelogin = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
          messages.push(error.msg);
        });
        return res.json({
          "message":messages        
        });
        // return res.redirect("/api/user/signup");
      }
      next();
    };

module.exports={userSignUpValidationRules,
                 validateSignup,
                userloginValidationRules,
              validatelogin};