const express = require('express');
const router = express.Router();
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const User = require('../model/user');
const helpers = require('./UserUtils');
let { users } = require('../data/UsersData');

/**
 * Création d'un utilisateur et ajout au tableau users.
 * Si le input est incorrect, on renvoie un code http 400 avec un message d'erreur
 * Si tout est OK, on renvoie l'utilisateur créé
 */
router.post('/', (req, res,next) => {
    try {
        const body = req.body;
        // vérification du input
        helpers.validateCreateInput(body);
        const user = new User(validator.escape(body.name), validator.escape(body.surname), body.dateOBirth, body.phone, body.address);
        user.id = uuidv4()
        users.push(user);
        res.status(201).send(user);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
})

/**
 * Recupération d'un utilisateur via son id en path param.
 * Si l'id utilisateur n'existe pas, on renvoie un code http 404.
 * Si l'id utilisateur existe, on renvoie l'utilisateur trouvé et un code http 200.
 */
router.get('/:id', (req, res, next) => {
    try {
        const idToFind = req.params.id;
        const userToFind = users.filter(user => user.id === idToFind)[0];
        if (!userToFind) {
            throw Error(`Id user ${idToFind} not found`)
        }
        res.send(userToFind);
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
})

/**
 * Suppression d'un utilisateur via son id en path param.
 * Si l'id utilisateur n'existe pas, on renvoie un code http 404.
 * Si l'id utilisateur existe, on le supprime du tableau users et on renvoie un code http 200.
 */
router.delete('/:id', (req, res, next) => {
    try {
        const idToDelete = req.params.id;
        const nbUsersBeforeDelete = users.length;
        users = users.filter(user => user.id !== idToDelete);
        if (users.length === nbUsersBeforeDelete) {
            throw Error(`Id user ${idToDelete} not found.`)
        }
        res.send();
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
})

/**
 * Modification d'un utilisateur via son id en path param.
 * Si l'id utilisateur n'existe pas, on renvoie un code http 404.
 * Si l'id utilisateur existe, on met à jour ses informations et on renvoie un code http 200.
 */
router.patch('/:id', (req, res, next) => {
    try {
        const idToUpdate = req.params.id;
        let updatedUser;
        helpers.validatePatchInput(req.body);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === req.params.id) {
                users[i].name = req.body.name ? req.body.name : users[i].name;
                users[i].surname = req.body.surname ? req.body.surname : users[i].surname;
                users[i].dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : users[i].dateOfBirth;
                users[i].phone = req.body.phone ? req.body.phone : users[i].phone;
                users[i].address = req.body.address ? req.body.address : users[i].address;

                updatedUser = users[i];
                break;
            }
        }
        if (!updatedUser) {
            throw Error(`Id user ${idToUpdate} not found`)
        }
        res.send(updatedUser);
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
})

module.exports = router;