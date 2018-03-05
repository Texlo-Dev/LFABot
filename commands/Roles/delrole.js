const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'delrole',
            enabled: true,
            description: 'Removes a role that you have requested.',
            aliases: [],
            botPerms: ['MANAGE_ROLES'],
            requiredSettings: [],
            runIn: ['text'],
            guildOnly: true,
            usage: '<role:rolename>'
        });
    }

    async run(message, [role]) {
        const existsRole = await this.client.db.roles.findOne({ where: { roleID: role.id } });
        if (!existsRole) return message.reply(`Sorry, that wasn't a valid role.`);
        message.member.roles.remove(role);
        message.reply(`You have been removed from the **${role.name}** role!`);
    }

};
