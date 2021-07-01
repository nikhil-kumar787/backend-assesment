const ActiveUser = require('../Models/ActiveUser')

const User = require('../Models/User')

let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year;

exports.currentDay = async (req,res) => {
    await ActiveUser.find({day:day}).exec((err,active) =>  {
        if(active) {
            res.status(200).json({todayActiveUsers:active.length})
        }
        if (err) {
            res.status(400).json({todayActiveUsers:"No active users found"})
        }
    })
}

exports.currentMonth = async (req,res) => {
    await ActiveUser.find({month:month}).exec((err,active) =>  {
        if(active) {
            res.status(200).json({ActiveUsersByMonth:active.length})
        }
        if (err) {
            res.status(400).json({ActiveUsersByMonth:"No active users found"})
        }
    })
}
