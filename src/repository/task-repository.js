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
    async getTask(userId){
        try {
            const task = await Task.find({userId:userId});
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
}

module.exports = TaskRepository;