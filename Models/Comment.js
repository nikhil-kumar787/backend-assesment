const  mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: true,
  },
  
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },

},{timestamps: true})
module.exports = mongoose.model('Comment',CommentSchema)