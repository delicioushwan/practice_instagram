require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'tmdghks752',
    database: 'cloning_instagram',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'cloning_instagram',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
