import { AuthService } from '../../../services/AuthService';
const { check, validationResult } = require("express-validator");

const Auth = (req,res) => {
    // const { errors } = validateUser(req.body);
    const  error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("empty")
      return res.status(400).json({ errors: error.array() });
    }

    const {name,email,password} = req.body;
    const authService = AuthService(name,email,password);
    return authService;
}
export { Auth}