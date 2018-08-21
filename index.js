const Client = require('./lfabot');
const config = require('./config.json');
Client.defaultPermissionLevels
    .add(1, (client, message) => message.member.roles.has('307140805213290506'), {
        fetch: true
    })
    .add(2, (client, message) => message.member.roles.has('304607444934459394'), {
        fetch: true
    });

Client.defaultClientSchema.add('pingAvailable', 'string', {
    array: true
});

const client = new Client({
    fetchAllMembers: true,
    prefix: './',
    cmdEditing: true,
    typing: false,
    readyMessage: (client) => `${client.user.tag}, Ready to take your orders!`
}).login(config.token);

process.on('unhandledRejection', console.error);