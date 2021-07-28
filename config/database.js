const { Sequelize } = require('sequelize');

module.exports = new Sequelize('codegig', 'root', 'developer', {
    host: 'localhost',
    dialect: 'mysql'
});