// Create middleware to protect routes + check user authentication

// Import jsonwebtoken > check token
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Export the middleware (+ manage errors)
module.exports = (req, res, next) => {
    try {
      // Get token 
      const token = req.headers.authorization.split(' ')[1]; // split(fractionner) string
      
      // Decode and verify token: use verify() function
      const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
      
      // Get userId from the token + check
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User ID non valide';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Requête invalide !')
      });
    }
  };