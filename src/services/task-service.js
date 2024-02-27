const TaskRepository = require('../repository/task-repository');
const UserRespository = require('../repository/user-repository');
const Task = require('../models/task');
const moment = require('moment');
class TaskService{
    constructor(){
        this.taskRepository = new TaskRepository();
        this.userRepository = new UserRespository();
    }
    async create(data){
        try {
            const task = await this.taskRepository.create(data);
            return task;
        } catch (error) {
            console.log("Somthing went wrong in the weeklist service layer");
        }
    }
    async get(userId){
        try {
            const task = await this.taskRepository.getTask(userId);
            return task;
        } catch (error) {
            console.log("Somthing went wrong in service layer");
        }
    }
    async updateCategory(data){
        try {
            const task = await this.taskRepository.updateCategory(data);
            return task;
        } catch (error) {
            console.log("Somthing went wrong in a service layer",error)
        }
    }

    async destroy(_id){
        try {
            await this.taskRepository.destroy(_id);
        } catch (error) {
            console.log("Somthing went wrong");
        }
    }
    async update(data){
        try {
            await this.taskRepository.update(data);
        } catch (error) {
            console.log("Somthging went wrong in service layer");
            throw error;
        }
    }
    
}   
    

module.exports = TaskService;