const knex = require('knex');
const config = require('./config');

const environment = !process.env.NODE_ENV ? "production" : process.env.NODE_ENV;
const dbConfig = config[environment];

const db = knex(dbConfig);

module.exports = db;
