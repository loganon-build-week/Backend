const express = require('express');
const server = express();

server.use(express.json());
server.get('/', async (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/login', (req, res) => {
    const newUser = req.body;
    if(!newUser.name) {
        return res.status(422).json({ message: 'Add a name' });
    }
    return URLSearchParams.insert(req.body).then(addUser => res.status(200).json(addUser));
});

server.delete('/homepage/:id', (req, res) => {
    return User.remove(req.params.id).then(user => {
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User has been deleted' });
    });
});

module.exports = server;