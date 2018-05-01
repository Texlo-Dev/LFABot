const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'tclose',
            enabled: true,
            description: 'Closes a support ticket.',
            runIn: ['text'],
            permLevel: 1,
            guildOnly: true
        });
    }

    async run(message) {
        const ticket = await this.client.db.scases.findOne({ where: { channelID: message.channel.id, isOpen: 'Yes' } });
        if (!ticket) return message.reply('There is no ticket currently open in this channel.');
        const close = await this.client.db.scases.update({ isOpen: 'No' }, { where: { caseNum: ticket.get('caseNum') } });
        this.client.channels.get(ticket.get('channelID')).delete();
        return message.author.send('You have successfully closed this ticket. Thank you for using the Linux For All Support service. Have a nice day!');
    }

};
