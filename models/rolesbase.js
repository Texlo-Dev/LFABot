const sequelize = require('sequelize');
module.exports = {
    sequelize: require('sequelize'),
    sq: new sequelize({
        dialect: 'sqlite',
        storage: './db/roles.sqlite'
    })
};

module.exports.sq
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully to the Roles database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports.sq.sync();