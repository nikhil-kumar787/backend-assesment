const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('./passport')

const todoRoute = require('./router/todorouter')
const todoComment = require('./router/commentrouter')

const app = express()

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

const active_user = 0;

genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  //Check If User Exists
  await User.findOne({ email: email }).exec((err, user) => {

    if (user) {

      bcrypt.compare(password, user.password, (err, isMatch) => {

        if (err) throw err;
        if (isMatch) {
          console.log(user._id)
          const token = genToken(user)
          res.status(200).json({ token, userid: user._id })



        }
        else {
          return res.status(403).json({ message: "Wrong Password" });
        }
      })
      // return res.status(403).json({ error: 'Email is already in use'});

    }
  })

})
app.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  const newUser = new User({ email, password, date: currentDate })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()

        .then(user => {
          console.log(newUser)

          res.status(200).json({ message: "User Registered Successfully" })

        })

    })
  })



});


app.get('/registered_user', async (req,res) =>{
  await User.find({date:currentDate}).exec((err,user) => {
    if(user) {
      res.status(200).json({todayRegistered:user.length})
    } if (err) {
      res.status(400).json({message:"No User Registered on today"})
    } 
  })
})



app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json("Secret Data")
})

app.use('/todo', todoRoute)
app.use('/comment', todoComment)

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function () {
  console.log('Connected to Mongo');
}).on('error', function (err) {
  console.log('Mongo Error', err);
})
app.listen(5000, () => {
  console.log('Server is up and running at the port 5000')
})