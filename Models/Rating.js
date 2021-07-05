const  mongoose = require('mongoose')
const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default:0,
  },
  
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  todo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },

},{timestamps: true})
module.exports = mongoose.model('Rating',RatingSchema)