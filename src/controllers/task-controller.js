const { StatusCodes } = require('http-status-codes');
const TaskService = require('../services/task-service');
const UserService = require('../services/user-service');

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
        const response = await taskService.get({
        userId: req.query.userId,
        selectedOption: req.query.selectedOption
    })
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
            message:"Successfully deleted the task",
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

const updateTask = async(req,res) =>{
    try {
        const response = await taskService.update({
            _id:req.body._id,
            title:req.body.taskTitle,
            priority:req.body.selectedPriority,
            checklists:req.body.checklists,
            countCompletedTask:req.body.countCompletedTask,
            dueDate:req.body.dueDate
        })
        return res.status(201).json({
            success:true,
            message:"Successfully updated the task",
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
const findTask = async(req,res)=>{
    try {
        const response = await taskService.findTask({
            _id:req.params.taskId
        })
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Successfully fetched the task",
            data:response,
            err:{}
        })
    } catch (error) {
    return res.status(error.statusCode).json({
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
    deleteTask,
    updateTask,
    findTask
}