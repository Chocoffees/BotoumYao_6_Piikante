// Configure users authentification routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Create controller > associate functions to different routes
const userCtrl = require('../controllers/user');

// Create routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Export the router (imported in app)
module.exports = router;