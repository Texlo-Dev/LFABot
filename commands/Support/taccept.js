const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'taccept',
            enabled: true,
            description: 'Accept a support ticket.',
            runIn: ['text'],
            usage: '<num:int>',
            permLevel: 1,
            guildOnly: true
        });
    }

    async run(message, [num]) {
        message.react(message.guild.emojis.get('350801315317809152'));
        const ticket = await this.client.db.scases.findOne({ where: { caseNum: num } });
        if (!ticket) return message.reply('That ticket does not exist.');
        const update = await this.client.db.scases.update({ manpage: message.author.id }, { where: { caseNum: num } }).catch(() => null);
        if (!update) return message.channel.send('Sorry, there was an error with this ticket.');
        const ch = message.guild.channels.get(ticket.get('channelID'));
        if (!ch) return message.channel.send('The original ticket channel was deleted. Abort.');
        ch.send(`${this.client.users.get(ticket.get('userID'))}, your ticket has been taken up by ${message.author.username}.\nTo close your ticket when completed, type \`${message.guild.configs.prefix}tclose\`.`);
    }

};
