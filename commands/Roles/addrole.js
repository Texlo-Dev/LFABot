const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'addrole',
            enabled: true,
            description: 'Adds a role from the currently available roles.',
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
        message.member.roles.add(role);
        message.reply(`You now have the **${role.name}** role!`);
    }

};
