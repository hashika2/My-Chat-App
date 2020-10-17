const express = require('express');
const router = express.Router();
const { Register,Login } = require('./Auth');

router.post("/upload", upload.single("file"),(req, res) => {
    res.redirect("/");
    const upload = Upload(req,res);
    return upload;    
});


module.exports = router;