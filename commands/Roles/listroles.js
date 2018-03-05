const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'listroles',
            enabled: true,
            description: 'Shows all of the currently available roles.',
            aliases: [],
            botPerms: ['MANAGE_ROLES'],
            requiredSettings: [],
            runIn: ['text'],
            guildOnly: true
        });
    }

    async run(message) {
        const list = await this.client.db.roles.findAll({ attributes: ['roleID'] });
        const embed = new (require('discord.js')).MessageEmbed()
            .setColor('#f2cf61')
            .setTitle('Available Roles')
            .setDescription(`${list.sort().map(l => message.guild.roles.get(l.roleID).name).join('\n') || 'No roles currently added.'}`)
            .setFooter(`LFABot`, this.client.user.displayAvatarURL())
            .setTimestamp();
        message.channel.send({ embed });
    }

};
