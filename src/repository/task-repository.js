const { StatusCodes } = require('http-status-codes');
const ServiceError = require('../Errors/service-error');
const Task = require('../models/task')
const User = require('../models/user');
class TaskRepository{
    async create(data){
        try {
            const task = await Task.create(data);
            if(task){
                await User.findByIdAndUpdate(task.userId,{
                    $push:{task:task._id}
                })
            }
            return task;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist repo",error);
        }
    }
    async getTask(data){
        try {
            const {userId,selectedOption} = data;
            let task;
            if (selectedOption === 'Today') {
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                task = await Task.find({ userId, createdAt: { $gte: startOfDay, $lt: new Date() } });
            }else if(selectedOption === "This Week")
            {
                const startOfWeek = new Date();
                startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
                
                const endOfWeek = new Date();
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);

                task = await Task.find({ userId, createdAt: { $gte: startOfWeek, $lt: endOfWeek } });
            } else if(selectedOption === "This Month")
            {
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const endOfMonth = new Date();
                endOfMonth.setMonth(endOfMonth.getMonth() + 1);
                endOfMonth.setDate(0);
                endOfMonth.setHours(23, 59, 59, 999);

                task = await Task.find({ userId, createdAt: { $gte: startOfMonth, $lt: endOfMonth } });
            }
            return task;
        } catch (error) {
            console.log("Somthing went wrong in repo layer",error);
        }
    }
    async updateCategory(data){
        try {
            const _id = data._id;
            const task = await Task.findByIdAndUpdate({_id},{category:data.category},{new:true})
            return task;
        } catch (error) {
            console.log("Somthing went wrong in the repo layer",error);
        }
    }
    
    async destroy(_id){
        try {
            await Task.findOneAndDelete({_id});
        } catch (error) {
            console.log("Somthing went wrong in repo layer",error);
        }
    }
   async update(data)
   {
    try {
        const {_id,title,checklists,dueDate,priority,countCompletedTask} = data;
        await Task.findOneAndUpdate({_id:_id},{
            title:title,
            checklists:checklists,
            dueDate:dueDate,
            priority:priority,
            countCompletedTask:countCompletedTask
        },{new:true});
    } catch (error) {
        console.log("Somthing went wrong");
        throw error;
    }
   }
   async findTask(_id)
   {
    try {
        const task = await Task.findById(_id);
        if(!task){
            throw new Error("Task not found");
        }
        return task;
    } catch (error) {
        console.log("Somthing went wrong in repo layer in findTask");
        throw error;
    }
   }
}

module.exports = TaskRepository;