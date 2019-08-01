const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

async function add(user) {
    const [id] = await db('users')
        .insert(user);
        console.log(id);
    return findById(id);
}

function find(id) {
    const query = db('users').select('id', 'username', 'password');
    if(id) {
        query.where({ id });
    }
    return query;
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function remove(id) {
    return await db('users')
        .del()
        .where({ id });
}