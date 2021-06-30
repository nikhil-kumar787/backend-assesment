const  mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: true,
  },
  
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }

},{timestamps: true})
module.exports = mongoose.model('Comment',CommentSchema)