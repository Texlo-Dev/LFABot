const {
    Command
} = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'spingrole',
            enabled: true,
            description: '[Staff] Temporarily makes a role pingable.',
            aliases: [],
            botPerms: ['MANAGE_ROLES'],
            requiredSettings: [],
            runIn: ['text'],
            guildOnly: true,
            usage: '<role:rolename>',
            permLevel: 2
        });
    }

    async run(message, [role]) {
        try {
            await role.setMentionable(true);
        } catch (ex) {
            message.reply(ex.toString());
            return;
        }
        await this.client.settings.update('pingAvailable', role.id);
        await message.reply(`${role.name} is now pingable`);
        setTimeout(async () => {
            try {
                await role.setMentionable(false);
            } catch (ex) {
                return;
            }
        }, 20000);
    }

};