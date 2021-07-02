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
  }

})
module.exports = mongoose.model('User',UserSchema)