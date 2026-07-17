const Task = require("../models/Task");



// ===============================
// CREATE TASK
// POST /api/tasks
// ===============================

const createTask = async (req, res) => {

    try {


        const {
            title,
            description,
            priority,
            dueDate
        } = req.body;



        const task = await Task.create({

            user: req.user._id,

            title,

            description,

            priority,

            dueDate

        });



        res.status(201).json({

            success:true,

            message:"Task created successfully",

            task

        });



    } catch(error){


        res.status(500);

        throw new Error(error.message);


    }

};









// ===============================
// GET ALL TASKS
// GET /api/tasks
// ===============================

const getTasks = async(req,res)=>{


    try{


        let query = {


            user:req.user._id


        };





        // Search

        if(req.query.search){


            query.title = {

                $regex:req.query.search,

                $options:"i"

            };


        }







        // Status filter

        if(req.query.status){


            query.status = req.query.status;


        }








        // Priority filter

        if(req.query.priority){


            query.priority = req.query.priority;


        }








        // Pagination

        const page = Number(req.query.page) || 1;


        const limit = 5;


        const skip = (page-1)*limit;









        // Sorting

        let sortOption = {};



        if(req.query.sort==="newest"){


            sortOption.createdAt = -1;


        }

        else if(req.query.sort==="oldest"){


            sortOption.createdAt = 1;


        }

        else if(req.query.sort==="priority"){


            sortOption.priority = -1;


        }

        else{


            sortOption.createdAt = -1;


        }









        const tasks = await Task.find(query)

        .sort(sortOption)

        .skip(skip)

        .limit(limit);






        const totalTasks = await Task.countDocuments(query);






        res.json({

            success:true,

            page,

            totalPages:Math.ceil(totalTasks/limit),

            count:tasks.length,

            tasks

        });





    }

    catch(error){


        res.status(500);

        throw new Error(error.message);


    }


};












// ===============================
// GET SINGLE TASK
// GET /api/tasks/:id
// ===============================

const getTask = async(req,res)=>{


    try{


        const task = await Task.findOne({

            _id:req.params.id,

            user:req.user._id

        });





        if(!task){


            return res.status(404).json({

                success:false,

                message:"Task not found"

            });


        }






        res.json({

            success:true,

            task

        });




    }

    catch(error){


        res.status(500);

        throw new Error(error.message);


    }


};











// ===============================
// UPDATE TASK
// PUT /api/tasks/:id
// ===============================

const updateTask = async(req,res)=>{


    try{


        const task = await Task.findOne({

            _id:req.params.id,

            user:req.user._id

        });






        if(!task){


            return res.status(404).json({

                success:false,

                message:"Task not found"

            });


        }









        // Update fields only if provided


        if(req.body.title){

            task.title = req.body.title;

        }



        if(req.body.description){

            task.description = req.body.description;

        }



        if(req.body.priority){

            task.priority = req.body.priority;

        }



        if(req.body.dueDate){

            task.dueDate = req.body.dueDate;

        }





        // IMPORTANT
        // Update status

        if(req.body.status){

            task.status = req.body.status;

        }








        const updatedTask = await task.save();







        res.json({

            success:true,

            message:"Task updated successfully",

            task:updatedTask


        });






    }

    catch(error){


        res.status(500);

        throw new Error(error.message);


    }


};











// ===============================
// DELETE TASK
// DELETE /api/tasks/:id
// ===============================

const deleteTask = async(req,res)=>{


    try{


        const task = await Task.findOne({

            _id:req.params.id,

            user:req.user._id

        });






        if(!task){


            return res.status(404).json({

                success:false,

                message:"Task not found"

            });


        }








        await task.deleteOne();






        res.json({

            success:true,

            message:"Task deleted successfully"

        });






    }

    catch(error){


        res.status(500);

        throw new Error(error.message);


    }


};












// ===============================
// UPDATE STATUS ONLY
// PATCH /api/tasks/:id/status
// ===============================

const updateStatus = async(req,res)=>{


    try{


        const task = await Task.findOne({

            _id:req.params.id,

            user:req.user._id

        });







        if(!task){


            return res.status(404).json({

                success:false,

                message:"Task not found"

            });


        }







        task.status = req.body.status;






        await task.save();







        res.json({

            success:true,

            message:"Status updated",

            task

        });






    }

    catch(error){


        res.status(500);

        throw new Error(error.message);


    }


};








module.exports = {


    createTask,

    getTasks,

    getTask,

    updateTask,

    deleteTask,

    updateStatus


};