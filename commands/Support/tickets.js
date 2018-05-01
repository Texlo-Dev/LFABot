const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ticket',
            enabled: true,
            description: 'Pulls up info on a specific ticket.',
            runIn: ['text'],
            usage: '<num:int>',
            permLevel: 1,
            guildOnly: true
        });
    }

    async run(message, [num]) {
        const ticket = await this.client.db.scases.findOne({ where: { caseNum: num } });
        if (!ticket) return message.reply('That ticket does not exist.');
        const embed = new (require('discord.js')).MessageEmbed()
            .setColor('#f2cf61')
            .setTimestamp()
            .setThumbnail((await this.client.users.fetch(ticket.get('userID'))).displayAvatarURL())
            .setFooter(this.client.user.username)
            .setAuthor(`Ticket #${ticket.get('caseNum')}`, this.client.user.displayAvatarURL())
            .addField('Member', (await this.client.users.fetch(ticket.get('userID'))).tag)
            .addField('Subject', ticket.get('subject'))
            .addField('Acting Manpage', this.client.users.get(ticket.get('manpage')) ? (await this.client.users.fetch(ticket.get('manpage'))).tag : 'None')
            .addField('Is Open', ticket.get('isOpen'));
        message.channel.send(embed);
    }

};
