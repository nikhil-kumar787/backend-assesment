const  mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
   type: Boolean,
   default: false
  },
  category : {
      type: String,
      enum :["task","hobby","work"],
      default: "task"

  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },



},{timestamps: true})
module.exports = mongoose.model('Todo',TodoSchema)