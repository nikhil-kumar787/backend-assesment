const  mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  date:{
  type: String,
  required: true, 
  },
  task_count: {
    type: Number,
    default: 0
  },
  todo_count:{
    type: Number,
    default: 0
  },
  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  confirmationCode: { 
    type: String, 
    unique: true },
})
module.exports = mongoose.model('User',UserSchema)