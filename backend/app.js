// Import Express
const express = require('express');

// Import 'helmet' > secure HTTP headers
const helmet = require('helmet');

// Import Mongoose
const mongoose = require('mongoose');

// Import Node 'path' module > give access to the path of our file system
const path = require('path');

// Import routers
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

require('dotenv').config()
// Create Express application
const app = express();

// Activ app protection from vulnerabilities 
app.use(helmet());

// Connect database
mongoose.connect(process.env.SECRET_DB,
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

// Set middleware > specify folder in charge to serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Save routes 
app.use('/api/sauces', sauceRoutes);
// Route root related to auth
app.use('/api/auth', userRoutes);

// Export the application
module.exports = app;