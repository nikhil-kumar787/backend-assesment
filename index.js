const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv')
const cors = require('cors');

require('./passport')

const todoRoute = require('./router/todorouter')
const todoComment = require('./router/commentrouter')
const todoActive = require('./router/activerouter')
const todoTag = require('./router/tagrouter')
const todoDownload = require('./router/downloadrouter')
const todoView = require('./router/viewrouter')
const ActiveUser = require('./Models/ActiveUser')

const app = express()
env.config();


var Publishable_Key = process.env.publishablekey
var Secret_Key = process.env.secretkey

const stripe = require('stripe')(Secret_Key) 


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
console.log(typeof(day))

app.use(cors());

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
  res.render('home', { 
    key: Publishable_Key 
    }) 
  // res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  //Check If User Exists
  await User.findOne({ email: email }).exec((err, user) => {

    if (user) {

      bcrypt.compare(password, user.password, async (err, isMatch) => {

        if (err) throw err;
        if (isMatch) {
          console.log(user._id)
          const token = genToken(user)
          await ActiveUser.find({userId:user._id}).exec((err,usr) => {
            if(usr.length == 0){
              console.log("Active user block",usr.length)
              
              const activeuser = new ActiveUser({
                day:day,
                month:month,
                userId:user._id
              })
              activeuser.save().then((active) => {
                res.status(200).json({ token, userid: user._id })
              })
            }
            else {
               res.status(200).json({ token, userid: user._id })
            }
          
          })
          



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


app.post('/payment', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Gautam Sharma', 
      address: { 
          line1: 'TC 9/4 Old MES colony', 
          postal_code: '110092', 
          city: 'New Delhi', 
          state: 'Delhi', 
          country: 'India', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 7000,    // Charing Rs 25 
          description: 'Web Development Product', 
          currency: 'USD', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
  }); 
}) 

/////////TO find Users with maximum task completion using sorting technique to find it////////////////


app.get('/count', async(req,res) => {
  var findQuery = await User.find().sort({task_count : -1}).limit().exec((err, maxResult) => {
    if (err) {return err;}
      
    if(maxResult) {
        console.log(maxResult)
        res.status(200).json({maxResult:maxResult})
    }
    // do stuff with maxResult[0]

});
})

app.use('/todo', todoRoute)
app.use('/comment', todoComment)
app.use('/activeuser', todoActive)
app.use('/tag', todoTag)
app.use('/excel', todoDownload)
app.use('/view', todoView)

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
mongoose.connection.once('open', function () {
  console.log('Connected to Mongo');
}).on('error', function (err) {
  console.log('Mongo Error', err);
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});