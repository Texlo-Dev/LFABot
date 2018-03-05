const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'addrolename',
            enabled: true,
            description: 'Adds a role to the list of requestable roles.',
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
        if (existsRole) return message.reply(`This role is already in the database.`);
        const res = await this.client.db.roles.create({ roleID: role.id });
        if (!res) return message.reply('Sorry, there was an error completing this operation.');
        return message.channel.send('Successfully added that role to the distro list.');
    }

};
