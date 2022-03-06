// Import Express 
const express = require('express');

// Create Express router > set up the routes to be used
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middleware/auth');

// Import controller
const sauceCtrl = require('../controllers/sauce');

// -- Create routes --
// Get all sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Get one sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Create sauce
router.post('/', auth, sauceCtrl.createSauce);

// Update one sauce
router.put('/:id', auth, sauceCtrl.updateSauce);

// Delete one sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Implement like and dislike status user
router.post('/:id/like', auth, sauceCtrl.defineLikeStatus);

// Export the router
module.exports = router;