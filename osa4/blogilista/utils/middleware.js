const logger = require('./logger')
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' }); // Päivitetty vastaamaan virheellistä tokenia
    }
  
    next(error);
  };

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const token = authorization.replace('Bearer ', '');
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken.id)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    request.userId = decodedToken.id; // Lisätään userid pyyntöön
    next();
};

const userExtractor = (request, response, next) => {
    if (!request.userId) {
        return response.status(401).json({ error: 'user not authenticated' });
    }

    // Tässä voit halutessasi tarkistaa, onko userId voimassa oleva käyttäjän id ja tehdä tarvittavat tarkistukset.

    next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}