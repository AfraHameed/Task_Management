const express = require("express");

const router = express.Router();


const {

registerUser,

loginUser,

getMe

}=require("../controllers/authController");


const protect = require("../middleware/authMiddleware");


const validate = require("../middleware/validationMiddleware");


const {body} = require("express-validator");




// Register validation

router.post(

"/register",

[

body("name")
.notEmpty()
.withMessage("Name is required"),


body("email")
.isEmail()
.withMessage("Enter valid email"),


body("password")
.isLength({min:6})
.withMessage("Password must contain minimum 6 characters")

],

validate,

registerUser

);





// Login

router.post(

"/login",

[

body("email")
.isEmail()
.withMessage("Enter valid email"),


body("password")
.notEmpty()
.withMessage("Password required")

],

validate,

loginUser

);





// Current user

router.get(

"/me",

protect,

getMe

);



module.exports = router;