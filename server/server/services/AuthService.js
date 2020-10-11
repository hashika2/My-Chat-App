const { User } = require('../../User');
const jwt = require('jsonwebtoken');
const database = require ('../../dbConnection');
require("dotenv").config();

database.db();
const AuthService = (name,email,password,res) => {
    const user = new User({
        name:name,
        email:email,
        password:password
    });

    user.save();
    // User Matched
    const payload = { id: user.id, name: user.name }; // Create JWT Payload
    // Sign Token
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );
    // return console.log("hashika")
   return res.send(token);   
}

module.exports = AuthService;