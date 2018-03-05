const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ticketclose',
            enabled: true,
            description: 'Closes a support ticket.',
            runIn: ['text'],
            usage: '<num:int>',
            permLevel: 1,
            guildOnly: true
        });
    }

    async run(message, [num]) {
        message.react('👌');
        const ticket = await this.client.db.scases.findOne({ where: { caseNum: num } });
        if (!ticket) return message.reply('That ticket does not exist.');
        if (ticket.get('manpage') !== message.author.id) return message.reply('This is not your ticket.');
        if (ticket.get('isOpen') === 'No') return message.reply('This ticket has aleready been closed, silly!');
        const close = await this.client.db.scases.update({ isOpen: 'No' }, { where: { caseNum: num } });
        this.client.channels.get(ticket.get('channelID')).delete();
        const tchannel = this.client.channels.get('419967098576699403');
        const m = await tchannel.messages.fetch(ticket.get('embedID'));
        const embed = m.embeds[0];
        embed.description = embed.description.replace(`This ticket has been taken up by ${message.author.tag}.`, `This ticket has been closed by ${message.author.tag}.`);
        m.edit(embed);
        this.client.users.get(ticket.get('userID')).send(`Your ticket has been closed by ${message.author.tag}. Thanks for stopping by the manpage support desk!`);
    }

};
