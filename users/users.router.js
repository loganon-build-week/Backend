const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
    const user = req.jwtToken.user;

    Users.find(user)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;
