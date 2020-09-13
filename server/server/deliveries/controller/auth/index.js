const express = require('express');
const router = express.Router();
const Auth = require('./Auth');

router.post('/',(req, res) => {

    const auth = Auth(req,res);
    const  error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }  
    return auth;    
});
module.exports = router;