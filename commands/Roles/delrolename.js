const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'delrolename',
            enabled: true,
            description: 'Deletes a role to the list of requestable roles.',
            aliases: [],
            botPerms: [],
            requiredSettings: [],
            runIn: ['text'],
            guildOnly: true,
            permLevel: 10,
            usage: '<role:rolename>'
        });
    }

    async run(message, [role]) {
        const existsRole = await this.client.db.roles.findOne({ where: { roleID: role.id } });
        if (!existsRole) return message.reply(`This role is not currently in the database.`);
        const res = await this.client.db.roles.destroy({ roleID: role.id });
        if (!res) return message.reply('Sorry, there was an error completing this operation.');
        return message.channel.send('Successfully deleted that role to the distro list.');
    }

};
