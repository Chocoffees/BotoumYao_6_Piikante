// Import Express
const express = require('express');

// Import Mongoose
const mongoose = require('mongoose');

// Create Express application
const app = express();

// Connect database
mongoose.connect('mongodb+srv://bo:malabar@cluster0.0o5rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Succès de la connexion à MongoDB !'))
  .catch(() => console.log('Echec de la connexion à MongoDB !'));

// Middleware which analyse json requests 
app.use(express.json());

// Security CORS: add middleware applicable to all routes, requests to server // CORS: prevent malicious requests
app.use((req, res, next) => {
    // Allow to access a resource > any origin '*'
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Headers authorized for requests
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Allow following mentionned methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Export the application
module.exports = app;