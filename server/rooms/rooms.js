const mongoose = require('mongoose');

let students = mongoose.model('students',{
    name:String,
    message:String
  });
  let chats = mongoose.model('chats',{    
    name:String,
    message:String
  });
  let officers = mongoose.model('officers',{    
    name:String,
    message:String      
  });
  let clients = mongoose.model('clients',{
    name:String,
    message:String
  });
  let developers = mongoose.model('developers',{
    name:String,
    message:String
  })

  module.exports = { students,chats,officers,clients,developers }