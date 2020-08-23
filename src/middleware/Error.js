// Middleware pour gérer les erreurs

const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.log('error', err.message, err)
    const { statusCode, message } = err;
    res.status(statusCode).send({ message });
}