// Fonctions utilitaires

const validator = require('validator');

/**
 * Permet de valider le body de la requête pour créer un utilisateur
 * @param {objet contenant toutes les informations d'un utilisateur} userInput 
 */
const validateCreateInput = (userInput) => {
    if (!userInput.name || userInput.name.length < 2) {
        throw Error('Name incorrect. Must be at least 2 characters long')
    }
    if (!userInput.surname || userInput.surname.length < 2) {
        throw Error('Surname incorrect. Must be at least 2 characters long')
    }
    if (!userInput.dateOfBirth || userInput.dateOfBirth.length !== 10 || !validator.isDate(userInput.dateOfBirth, 'DD/MM/YYYY')) {
        throw Error('Date of birth incorrect. Must be in format dd/mm/yyyy')
    }
    if (!userInput.phone || userInput.phone.length !== 10 || !validator.isMobilePhone(userInput.phone, 'fr-FR')) {
        throw Error('Phone incorrect. Must be french number with 10 digits')
    }
    if (!userInput.address || userInput.address.length < 5) {
        throw Error('Address incorrect. Must be at least 5 characters long')
    }
}

/**
 * Permet de valider le body de la requête de modification d'un utilisateur
 * @param {objet contenant des informations d'un utilisateur} userInput 
 */
const validatePatchInput = (userInput) => {
    if (userInput.name && userInput.name.length < 2) {
        throw Error('Name incorrect. Must be at least 2 characters long')
    }
    if (userInput.surname && userInput.surname.length < 2) {
        throw Error('Surname incorrect. Must be at least 2 characters long')
    }
    if ((userInput.dateOfBirth && userInput.dateOfBirth.length !== 10) || (userInput.dateOfBirth && !validator.isDate(userInput.dateOfBirth, 'DD/MM/YYYY'))) {
        throw Error('Date of birth incorrect. Must be in format dd/mm/yyyy')
    }
    if ((userInput.phone && userInput.phone.length !== 10) || (userInput.dateOfBirth && validator.isMobilePhone(userInput.phone, 'fr-FR'))) {
        throw Error('Phone incorrect. Must be french number with 10 digits')
    }
    if (userInput.address && userInput.address.length < 5) {
        throw Error('Address incorrect. Must be at least 5 characters long')
    }
}

let helpers = {
    validateCreateInput,
    validatePatchInput
}

module.exports = helpers;