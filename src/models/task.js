const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    checklists: [
    {
      text: { type: String, required: true }, 
      checked: { type: Boolean, default: false }
    }
      ],
    dueDate: {
      type: Date
    },
    priority: {
      type: String,
      enum: ['High', 'Moderate', 'Low'],
      default: 'Low'
    },
    category: {
      type: String,
      enum: ['todo', 'backlog', 'in progress', 'done'],
      default: 'todo'
    },
    countCompletedTask:{
      type:Number,
    }
  });
  const Task = mongoose.model('Task',taskSchema);
module.exports = Task;