const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const user = require('./routes/UserRouter');
const erroMiddleware = require('./middleware/Error');

const app = express();
winston.add(winston.transports.File, { filename: 'log.log' });
app.use(helmet());
app.use(express.json());
app.use('/api/user', user);
app.use(erroMiddleware)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log('Server started at PORT: 3000');
});

module.exports = server;