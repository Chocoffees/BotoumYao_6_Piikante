// Import sauce model
const sauce = require('../models/sauce');

// Functions
exports.getAllSauces = (req, res, next) => {
    sauce.find() // return all sauces [] from database 
    .then(sauces => res.status(200).json(sauces)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id }) // return 1 sauce (match id)  
    .then(sauce => res.status(200).json(sauce)) // Status 200 = success
    .catch(error => res.status(400).json({ error }));
}

// In this version: update controller for new incoming request (multer now added)
// then implement access to path in application
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
    ...sauceObject,
    // In this version: imageUrl now is configured
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

// In this version: update function (multer now added)
// last step to allow the application to correctly handle image downloads when adding new sauce/update existing sauce)
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    sauce.updateOne() ({ _id: req.params.id}, { ...sauceObject, _id: req.params.id }) // update sauce (match id)
    .then(() => res.status(200).json({ message: 'Sauce mise à jour !'}))
    .catch(error => res.status(400).json({ error })); 
}

exports.deleteSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.defineLikeStatus = (req, res, next) => {
    
}