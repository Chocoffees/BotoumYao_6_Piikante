// Import Mongoose
const mongoose = require('mongoose');

// Email unicity warranty > use mongoose-unique-validator plugin 
const uniqueValidator = require('mongoose-unique-validator');

// Create and structure dataModels for user > use Schema object
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Add keyword unique to ensure that 2 users can not use the same email address
    password: { type: String, required: true, }
});

// Implement uniqueValidator plugin
userSchema.plugin(uniqueValidator);

// Export the model
module.exports = mongoose.model('user', userSchema);