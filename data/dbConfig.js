const knex = require('knex');
const config = require('../knexfile');

const dbENV = process.env.DB_ENV || 'development';

module.exports = knex(config[dbENV]);