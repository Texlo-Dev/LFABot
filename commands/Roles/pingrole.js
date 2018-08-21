const {
    Command
} = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'pingrole',
            enabled: true,
            description: 'Temporarily makes a role pingable.',
            aliases: [],
            botPerms: ['MANAGE_ROLES'],
            requiredSettings: [],
            runIn: ['text'],
            guildOnly: true,
            permLevel: 2,
            usage: '<role:rolename>'
        });
    }

    async run(message, [role]) {
        try {
            await role.setMentionable(true);
        } catch (ex) {
            message.reply(ex.toString());
        }
        await this.client.settings.update('pingAvailable', role.id);
        await message.react('👍');
    }

    async init() {
        this.client.settings.update('pingAvailable', '');
    }

};