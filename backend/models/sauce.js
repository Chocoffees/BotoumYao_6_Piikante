// Import Mongoose
const mongoose = require('mongoose');

// Create and structure dataModels for sauces > use Schema object to define properties
const sauceSchema = mongoose.Schema({
    userId: { // userId = MongoDB creator id
        type: String, 
        required: true }, 
    name: { 
        type: String, 
        required: true },
    manufacturer: { 
        type: String, 
        required: true },
    description: { 
        type: String, 
        required: true },
    mainPepper: { 
        type: String, 
        required: true },
    imageUrl: { 
        type: String, 
        required: true },
    heat: { 
        type: Number, 
        min: 1, 
        max: 10, 
        required: true },
    likes : { 
        type: Number },
    dislikes: { 
        type: Number },
    usersLiked: [ String ], // = array of user ids who liked the product
    usersDisliked : [ String ], // = array of user ids who disliked the product
});

// Export the model 'sauce' (= name of model in database) > allow interactivity with database with schema created
module.exports = mongoose.model('sauce', sauceSchema);