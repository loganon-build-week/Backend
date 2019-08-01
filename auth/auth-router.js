const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/signup', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14); // this number adds hashing
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json({ message: `${user.username} has been added!`, saved }); // if fields are filled in then the user will be saved
        })
        .catch(error => {
            res.status(500).json(error); // if there is an error in the code then this code will show
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first() // selects the first user that shows up. Without this it would show an array of all users
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) { // this compares the the credentials
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token }); // if the credentials all match then the user will be logged in
            } else {
                res.status(401).json({ message: 'Invalid credentials' }); // if invalid
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/homepage/:id', (req, res) => { // unsure of 'homepage/:id', but it should delete specific user
    return User.remove(req.params.id).then(user => {
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User has been deleted' });
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