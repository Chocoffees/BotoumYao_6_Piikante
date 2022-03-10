// Create users

// Salt and hash password > securely store user password
const bcrypt = require('bcrypt');
// Secure API access (->informations<-)
const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User');

// Register new users in database: use signup function
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  // call of the bcrypt hash function in the password and asks to "salt" the password
    // create and register user in database (return res success/failure)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          console.log(error)
          res.status(400).json({ error })});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error })});
    };
      
// Connect users to app: use login function to check user informations
// > Permit connection
exports.login = (req, res, next) => {
    // Search user in database: use findOne() method
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {  // if can not find user
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Compare password in database with the one entered by user > use compare() method
        bcrypt.compare(req.body.password, user.password)
          .then(valid => { // return boolean (comparison correct or not)
            if (!valid) { // invalid password entered
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ // return JSON obj which will contain 1 user.id
              userId: user._id,
              // Allow user connection with encrypted token 
              token: jwt.sign( // encode new token: use sign()
                  { userId: user._id },
                  process.env.RANDOM_TOKEN_SECRET, // long random string
                  { expiresIn: '24h' } // configuration > apply access token expiration delay
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
      