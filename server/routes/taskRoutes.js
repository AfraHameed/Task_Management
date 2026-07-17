const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");


const validate = require("../middleware/validationMiddleware");


const {body}=require("express-validator");


const {

createTask,

getTasks,

getTask,

updateTask,

deleteTask,

updateStatus

}=require("../controllers/taskController");





// Create task validation

router.post(

"/",

protect,


[

body("title")
.notEmpty()
.withMessage("Task title required")

],


validate,


createTask

);





router.get(

"/",

protect,

getTasks

);



router.get(

"/:id",

protect,

getTask

);




router.put(

"/:id",

protect,

updateTask

);




router.delete(

"/:id",

protect,

deleteTask

);




router.patch(

"/:id/status",

protect,

updateStatus

);



module.exports = router;