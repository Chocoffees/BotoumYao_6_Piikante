// Import sauce model
const Sauce = require('../models/sauce');

// Import fs module > interact with file system
const fs = require('fs');

// Functions
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // return all sauces [] from database 
    .then(sauces => res.status(200).json(sauces)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // return 1 sauce (match id)  
    .then(sauce => res.status(200).json(sauce)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    });
    sauce.save() // save new sauce in database 
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !'})) // Status 201 = created
    .catch(error => res.status(400).json({ error })); // Status 400 = bad request/data
}

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id }) // update sauce (match id)
    .then(() => res.status(200).json({ message: 'Sauce mise à jour !'}))
    .catch(error => res.status(400).json({ error })); 
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { // use fs.unlink() function to delete file
            Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.defineLikeStatus = (req, res, next) => {
    
}