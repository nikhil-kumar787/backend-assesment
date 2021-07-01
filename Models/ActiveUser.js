const  mongoose = require('mongoose')
const ActiveUserSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  week: {
    type: String,
   
  },
  month: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }

},{timestamps: true})
module.exports = mongoose.model('ActiveUser',ActiveUserSchema)