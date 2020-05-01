const config=require('config');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {User, validate} = require('./User');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const database =require ('./dbConnection')
database.db();

// const mongoose =require('mongoose');


//connect with atlas
// const uri = "mongodb+srv://dbUser:dbUser@cluster0-qollh.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true})
// console.log("db is connected")


//register new user
router.post('/', async (req, res) => {
  console.log(req.body)
  const {error}=validate(req.body);
  
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email})
  console.log(user)
  if(user){
   return(
     res.status(400).send('User already exist')
     )
   }

  //save user on the database
  user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  });
  //console.log(user.email)

  //set hash password
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);

  //user =new user()
  await user.save();
  const payload={
    user:{
      id:user.id
    }
  }
  // jwt.sign(payload,"jwtToken"),
  // {expiresIn:360000},
  // (err,token)=>{
  //   if(err) throw err;
  //   res.json({token})
  // }

  //set token
  const token=jwt.sign({payload},"jwtPrivateKey",{expiresIn:'24h'})
  console.log(token)
  //res.send(_.pick(user,['_id','name','email']))
  res.send(token)
  //same as above(send details to the client)

  // res.send({
  //   name:user.name,
  //   email:user.email
  // })
  }
);


router.post('/login', (req, res) => {
  //const { errors, isValid } = validateLoginInput(req.body);
  const {error}=validate(req.body);
  // Check Validation
  //if(error) return res.status(400).send(error.details[0].message);
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      error.email = 'User not found';
      return res.status(404).json(error);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload
        // Sign Token
        const token=jwt.sign(
          payload,
          "jwtPrivateKey",
          { expiresIn: 3600 }
        );
        console.log(token)
        res.send(token)
        // (err, token) => {
        //   res.json({
        //     success: true,
        //     token: 'Bearer ' + token
        //   });
        // }
      } else {
        error.password = 'Password incorrect';
        return res.status(400).json(error);
      }
    });
  });
});//

module.exports = router;

