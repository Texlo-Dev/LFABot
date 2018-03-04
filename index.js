const Client = require('./lfabot');
const config = require('./config.json');


const client = new Client({
    fetchAllMembers: true,
    prefix: '/',
    cmdEditing: true,
    typing: true,
    readyMessage: (client) => `${client.user.tag}, Ready to take your orders!`
}).login(config.token);
client.sqlite = require('./models/db');

process.on('unhandledRejection', console.error);