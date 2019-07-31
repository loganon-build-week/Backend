const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Something is not right' });
            } else {
                res.jwtToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'Please provide a token' });
    }
};