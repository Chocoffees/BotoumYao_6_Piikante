// Import Express 
const express = require('express');

// Create Express router > set up the routes to be used
const router = express.Router();

// Import controller
const sauceCtrl = require('../controllers/sauce');

// -- Create routes --
// Get all sauces
router.get('/', sauceCtrl.getAllSauces);

// Get one sauce
router.get('/:id', sauceCtrl.getOneSauce);

// Create sauce
router.post('/', sauceCtrl.createSauce);

// Update one sauce
router.put('/:id', sauceCtrl.updateSauce);

// Delete one sauce
router.delete('/:id', sauceCtrl.deleteSauce);

// Implement like and dislike status user
router.post('/:id/like', sauceCtrl.defineLikeStatus);

// Export the router
module.exports = router;