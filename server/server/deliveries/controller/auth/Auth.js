const  {RegisterService,LoginService}  = require('../../../services/AuthService');
const { check, validationResult } = require("express-validator");

const Register = (req,res) => {
    // const { errors } = validateUser(req.body);
    const  error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const {name,email,password} = req.body;
    const authService = RegisterService(name,email,password,res);
    return authService;
}

const Login = (req,res) => {
  // const { errors } = validateUser(req.body);
  const  error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("empty")
    return res.status(400).json({ errors: error.array() });
  }

  const {email,password} = req.body;
  const authService = LoginService(email,password,res);
  return authService;
}
module.exports = {Register,Login};