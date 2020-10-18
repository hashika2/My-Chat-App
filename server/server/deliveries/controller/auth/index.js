const express = require('express');
const router = express.Router();
const { Register,Login } = require('./Auth');
const { Upload } = require('../upload/Upload');


router.post('/',(req, res) => {
    const register = Register(req,res);
    return register;    
});

router.post('/login',(req, res) => {
  const login = Login(req,res);
  return login;    
});

require("dotenv").config();
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const mongoURI = "mongodb+srv://hashika:hashika@cluster0-qollh.mongodb.net/test?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURI,{useUnifiedTopology: true,useNewUrlParser: true});


// init gfs
let gfs;
conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

// Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
        if (err) {
            return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
            filename: filename,
            bucketName: "uploads"
        };
        resolve(fileInfo);
        });
    });
    }
});

const upload = multer({
    storage
});

router.post("/upload", upload.single("file"),(req, res) => {
  console.log(req.file)
  res.redirect("/");
  // const upload = Upload(req,res);
  // return upload;    
});

module.exports = router;