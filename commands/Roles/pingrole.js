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
            usage: '<role:rolename>',
            cooldown: 60 * 60
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
        await message.reply(`You have 10 seconds to mention ${role.name} once.`);
        setTimeout(async () => {
            try {
                await role.setMentionable(false);
            } catch (ex) {
                return;
            }

        }, 10000);
    }

};