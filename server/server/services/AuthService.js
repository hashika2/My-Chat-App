const { User } = require('../../User');
const jwt = require('jsonwebtoken')

const AuthService = (name,email,password) => {
    const user = new User({
        name:name,
        email:email,
        password:password
    });

    user.save();
    // User Matched
    const payload = { id: user.id, name: user.name }; // Create JWT Payload
    // Sign Token
    const token = jwt.sign(
      payload,
      process.env.secretKey,
      { expiresIn: 3600 }
    );
   return res.send(token);   
}

export {AuthService};