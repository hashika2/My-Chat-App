const { User } = require('../shared/database/entities/User');
const jwt = require('jsonwebtoken');
const database = require ('../../dbConnection');
require("dotenv").config();
const bcrypt = require('bcryptjs')

database.db();
const RegisterService = (name,email,password,res) => {
    const user = new User({
        name:name,
        email:email,
        password:password
    });

    user.save();
    // User Matched
    const payload = { id: user.id, name: user.name };
    // Sign Token
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );
    console.log(token)
   return res.send(token);   
}

const LoginService = (email,password,res) => {
 User.findOne({ email }).then(user => {
  if (!user) {
    console.log("userot found")
    error.email = 'User not found';
    return res.status(404).json(error);
  }

  // Check Password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {    
      // User Matched
      const payload = { id: user.id, name: user.name };
      // Sign Token
      const token=jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 3600 }
      );
      const accessToken = {
        accessToken: token
      }
      res.send(accessToken)
    } else {
      error.password = 'Password incorrect';
      return res.status(400).json(error);
    }
  });
});   
}

module.exports = {RegisterService, LoginService};