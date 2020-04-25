const config=require('config');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {User, validate} = require('./User');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/mydb',console.log("mongodb connected"))

//register new user
router.post('/', async (req, res) => {
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
  user =new User({
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


router.post('/login',(req,res) =>{
  re
})

module.exports = router;

