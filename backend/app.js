// Import Express
const express = require('express');

// Import Mongoose
const mongoose = require('mongoose');

// Import model 'sauce'
const sauce = require('./models/sauce');

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


app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
    const sauce = new Sauce({
    ...req.body,
    });
    sauce.save() // save new sauce in database 
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !'})) // Status 201 = created
    .catch(error => res.status(400).json({ error })); // Status 400 = bad request
});


app.get('/api/sauces/:id', (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});


app.get('/api/sauces', (req, res, next) => {
  sauce.find() // return all sauces [] from database 
  .then(sauces => res.status(200).json(sauces)) // Status 200 = success
  .catch(error => res.status(400).json({ error }));
});


// Export the application
module.exports = app;