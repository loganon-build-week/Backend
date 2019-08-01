const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/signup', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14); // number this adds hashing and 
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json({ message: `${user.username} has been added!`, saved });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        username:user.username
    };
    const jwtOptions = {
        expiresIn: '1d',
    };
    return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;