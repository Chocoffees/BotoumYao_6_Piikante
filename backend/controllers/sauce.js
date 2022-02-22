// Import sauce model
const sauce = require('../models/sauce');

// Functions
exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
    ...req.body,
    imageUrl, // = String (URL user uploaded image) > to configure
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    });
    sauce.save() // save new sauce in database 
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !'})) // Status 201 = created
    .catch(error => res.status(400).json({ error })); // Status 400 = bad request
}

exports.getAllSauces = (req, res, next) => {
    sauce.find() // return all sauces [] from database 
    .then(sauces => res.status(200).json(sauces)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    sauce.findOne() // return 1 sauce (match id)  
    .then(sauce => res.status(200).json(sauce)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}


