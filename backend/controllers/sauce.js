// Import sauce model
const Sauce = require('../models/sauce');

// Import fs module > interact with file system
const fs = require('fs');
//const sauce = require('../models/sauce');

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
        .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !' })) // Status 201 = created
        .catch(error => res.status(400).json({ error })); // Status 400 = bad request/data
}

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // update sauce (match id)
        .then(() => res.status(200).json({ message: 'Sauce mise à jour !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // use fs.unlink() function to delete file
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// User interaction with sauces
exports.defineLikeStatus = (req, res) => {
    // --- Scenario "1": user likes the sauce ---
    if (req.body.like == 1) {
        Sauce.findOne({ _id: req.params.id }) // use findOne() method to select sauce
            .then(sauce => {
                /**
                 * Check if current user has been yet liked the sauce
                 * 1- refer to array "usersLiked" (data Models sauce) if contain userId
                 * 2- update sauce data
                 */
                if (sauce.usersLiked.includes(req.body.userId)) {
                    res.status(400).json({ message: 'Sauce ALREADY LIKED' })
                } else {
                    // use $inc operator to increment number of likes & $push to append userId to array "usersliked" 
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Sauce LIKED by user ' + req.body.userId }))
                        .catch((error) => res.status(400).json({ error }))
                }
            })
    }

    // --- Scenario "-1": user dislikes the sauce ---
    else if (req.body.like == -1) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                /**
                     * Check if current user has been yet disliked the sauce
                     * 1- refer to array "usersDisliked" (data Models sauce) if contain userId
                     * 2- update sauce data
                     */
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(400).json({ message: 'Sauce ALREADY DISLIKED' })
                } else {
                    // use $inc operator to increment number of dislikes
                    // Math.abs() > convert -x to absolute value
                    // $push to append userId to array "usersDisliked" 
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: Math.abs(req.body.like++) }, $push: { usersDisliked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Sauce DISLIKED by user ' + req.body.userId }))
                        .catch((error) => res.status(400).json({ error }))
                }
            })
    }

    // --- Scenario "0": user cancels his like/dislike ---
    else if (req.body.like == 0) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                /**
                     * 1- Check if array "usersLiked" (data Models sauce) already contain userId
                     * 2- Update sauce data
                     */
                if (sauce.usersLiked.includes(req.body.userId)) {
                    // use $inc operator here to decrement number of likes & $pull to remove userId from array "usersLiked" 
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like - 1 }, $pull: { usersLiked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Like CANCELED by user ' + req.body.userId }))
                        .catch((error) => res.status(400).json({ error }))
                }
                /**
                     * Or
                     * 1- Check if array "usersDisliked" (data Models sauce) already contain userId
                     * 2- Update sauce data
                     */
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                     // use $inc operator too here to decrement number of dislikes & $pull to remove userId from array "usersDisliked"
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: req.body.like - 1 }, $pull: { usersDisliked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Dislike CANCELED by user ' + req.body.userId }))
                        .catch((error) => res.status(400).json({ error }))
                }
            })
    }
}