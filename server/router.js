const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.post('/register',(req,res) =>{
  
})

router.post('/login',(req,res) =>{
  re
})

module.exports = router;