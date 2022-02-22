// Import Express 
const express = require('express');

// Create Express router > set up the routes to be used
const router = express.Router();

// Import controller
const sauceCtrl = require('../controllers/sauce');

// Create routes
router.post('/', sauceCtrl.createSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);

// Export the router
module.exports = router;