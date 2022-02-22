// Import Mongoose
const mongoose = require('mongoose');

// Create and structure dataModels for sauces > use Schema object
const sauceSchema = mongoose.Schema({
    // userId = MongoDB creator id
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, min: 1, max: 10, required: true },
    likes : { type: Number },
    dislikes: { type: Number },
    usersLiked: [ String ], // = array of user ids who liked the product
    usersDisliked : [ String ], // = array of user ids who disliked the product
});

// Export the model
module.exports = mongoose.model('sauce', sauceSchema);