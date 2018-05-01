const { sequelize, sq } = require('./scbase');
module.exports = sq.define('supportcases', {
    userID: sequelize.STRING,
    caseNum: sequelize.INTEGER,
    title: sequelize.STRING,
    description: sequelize.TEXT,
    manpage: sequelize.STRING,
    experience: sequelize.STRING,
    channelID: sequelize.STRING,
    embedID: sequelize.STRING,
    isOpen: sequelize.STRING
});
