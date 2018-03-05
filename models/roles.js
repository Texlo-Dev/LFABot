const { sequelize, sq } = require('./rolesbase');
module.exports = sq.define('roles', { roleID: sequelize.STRING });
