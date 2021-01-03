const express = require('express');
const router = express.Router();
const { Register,Login } = require('./Auth');

router.post('/',(req, res) => {
  console.log(req)
    const register = Register(req,res);
    return register;    
});

router.post('/login',(req, res) => {   
  const login = Login(req,res);
  return login;    
});

module.exports = router;