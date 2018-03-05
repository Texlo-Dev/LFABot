const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ticketaccept',
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
        const ch = message.guild.channels.get('419967098576699403');
        const m = await ch.messages.fetch(ticket.get('embedID'));
        const embed = m.embeds[0];
        embed.description = embed.description.replace(`To take up this ticket, run /ticketaccept <ticket#>`, `This ticket has been taken up by ${message.author.tag}`);
        m.edit({ embed });
        const createchannel = await message.guild.channels.create(`ticket-${ticket.get('caseNum')}`, {
            type: 'text',
            overwrites: [
                {
                    id: message.guild.defaultRole.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: ticket.get('userID'),
                    allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: '313709564489105409',
                    allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: '304607444934459394',
                    allowed: ['VIEW_CHANNEL', 'READ_MESSAGES']
                }

            ],
            parent: this.client.channels.get('355909803412946945')
        });
        const updateID = await this.client.db.scases.update({ channelID: createchannel.id }, { where: { caseNum: num } });
        const notify = message.guild.members.get(ticket.get('userID')).send(`Your ticket has been accepted by ${message.author}, and they are ready for you in ${createchannel}!`)
            .catch(() => createchannel.send(`${message.guild.members.get(ticket.get('userID'))}: Your ticket has been accepted by ${message.author}, and they are ready for you!`));
    }

};
