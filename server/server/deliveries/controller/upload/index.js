const express = require('express');
const router = express.Router();
const multer = require("multer");
const { setStorage } = require('./Upload');
const jwt = require('jsonwebtoken');
/* nee to clarrify */
require("dotenv").config();
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");

const mongoURI = "mongodb+srv://hashika:hashika@cluster0-qollh.mongodb.net/test?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURI,{useUnifiedTopology: true,useNewUrlParser: true});

 /* init gfs */
let gfs;
conn.once("open", () => {
    /* init stream */
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

/* Storage */
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

/***        check autherization         ***/
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return  res.status(403).json({error:'Forbidden'});
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post("/upload", upload.single("file"),authenticateJWT,(req, res) => {
  res.json({message:"uploaded"});
  // const upload = Upload(req,res);
  // return upload;    
});



// router.post("/upload", upload.single("file"),(req, res) => {
//     res.redirect("/");
//     const upload = Upload(req,res);
//     return upload;    
// });


module.exports = router;