// Create users

const bcrypt = require('bcrypt');
const user = require('../models/user');

// Register new users in database: use signup function
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  // call of the bcrypt hash function in the password and asks to "salt" the password
    // create and register user in database (return res success/failure)
    .then(hash => {
      const user = new user({
        email: req.body.email,
        password: hash
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    };
      
// Connect users to app: use login function to check user informations
// > Permit connection
exports.login = (req, res, next) => {
    
};
      