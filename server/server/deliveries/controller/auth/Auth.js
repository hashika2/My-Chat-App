const  {RegisterService,LoginService}  = require('../../../services/AuthService');
const { check, validationResult } = require("express-validator");
const {validateLoginAttributes} = require('./loginAttributesValidation')

const Register = (req,res) => {
    const  error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const {name,email,password} = req.body;
    const authService = RegisterService(name,email,password,res);
    return authService;
}

const Login = (req,res) => {
  const { email,password } = req.body;
  const validateResult = validateLoginAttributes({email,password})
  if (validateResult.error) {
    return res.status(400).json({ error: validateResult.error.details[0].message });
  }

  const authService = LoginService(email,password,res);
  return authService;
}
module.exports = {Register,Login};