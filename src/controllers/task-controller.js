const TaskService = require('../services/task-service');

const taskService = new TaskService();

const createTask = async(req,res)=>{
    try {
        const response = await taskService.create({
            title:req.body.taskTitle,
            userId:req.body.userId,
            checklists:req.body.checklists,
            dueDate : req.body.dueDate,
            priority : req.body.selectedPriority,
            countCompletedTask:req.body.countCompletedTask,
            category:req.body.category
        })
        return res.status(201).json({
            success:true,
            message:"Successfully created task",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            data:{},
            err:error
        })
    }
}
const getTask = async(req,res)=>{
    try {
        const response = await taskService.get(req.query.userId)
        return res.status(201).json({
            success:true,
            message:"Successfully fetched the task",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            data:{},
            err:error
        })
    }
}
const updateCategory = async(req,res)=>{
    try {
        const response = await taskService.updateCategory({
            _id:req.body.taskId,
            category:req.body.category
        })
        return res.status(201).json({
            success:true,
            message:"Successfully updated the task category",
            data:response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            data:{},
            err:error
        })
    }
}

const deleteTask = async(req,res)=>{
    try {
        const response = await taskService.destroy({
            _id:req.body.taskId
        })
        return res.status(201).json({
            success:true,
            message:"Successfully deleted the task category",
            data:response,
            err:{}
        });
    } catch (error) {
    console.log(error);
    return res.status(400).json({
        success:false,
        message:error.message,
        data:{},
        err:error
    })
    }
}


module.exports ={
    createTask,
    getTask,
    updateCategory,
    deleteTask
}