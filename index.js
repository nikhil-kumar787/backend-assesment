const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('./passport')

const todoRoute = require('./router/todorouter')

const app = express()
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
app.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  
  //Check If User Exists
  await User.findOne({ email: email }).exec((err,user) => {
  
  if (user) {
    
    bcrypt.compare(password, user.password, (err,isMatch) => {
      
      if (err) throw err;
      if (isMatch) {
        console.log(user._id)
        const token = genToken(user)
         res.status(200).json({token,userid:user._id})
         
       

      }
      else {
        return res.status(403).json( {message:"Wrong Password"});
      }
  })
    // return res.status(403).json({ error: 'Email is already in use'});
    
  }
  })
  
 
  const newUser = new User({ email, password})
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(newUser.password, salt, (err,hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()

        .then(user=> {
          const token = genToken(newUser)
  res.status(200).json({token})
            // return done(null,user);
        })
        // .catch(err => {
        //     // return done(null,false, {message: err});
        //     res.status(403).json({ err: 'Error'});
        // })
    })
})
  // await newUser.save()
  // // Generate JWT token
  // const token = genToken(newUser)
  // res.status(200).json({token})
});

app.get('/secret', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    res.json("Secret Data")
  })

  app.use('/todo',todoRoute)

mongoose.connect("mongodb+srv://nikhilkumar:bhQWUrUfnDq0aaKw@cluster0.g2p2u.mongodb.net/Test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo');
}).on('error',function(err){
  console.log('Mongo Error', err);
})
app.listen(5000,()=>{
  console.log('Serve is up and running at the port 5000')
})