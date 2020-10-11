const express = require('express');
const router = express.Router();
const Auth = require('./Auth');

router.post('/',(req, res) => {

    const auth = Auth(req,res);
    return auth;    
});

module.exports = router;