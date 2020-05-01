const mongoose = require('mongoose');

function db(){
    mongoose.connect('mongodb://localhost/mydb',console.log("mongodb connected"))
}

exports.db = db;