const mongoose = require('mongoose');
const taskSchema = require('./task')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task',
    }],
},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;