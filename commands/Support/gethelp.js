const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'gethelp',
            enabled: true,
            description: 'Get help from a server manpage.',
            runIn: ['text', 'dm'],
            usage: '<subject:str>',
            guildOnly: true
        });
    }

    async run(message, [subject]) {
        message.react(message.guild.emojis.get('350801315317809152'));
        const cases = await this.client.db.scases.count();

        const createchannel = await message.guild.channels.create(`ticket-${cases + 1}`, {
            type: 'text',
            overwrites: [
                {
                    id: message.guild.defaultRole.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
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

        const res = await this.client.db.scases.create({
            userID: message.author.id,
            caseNum: cases + 1,
            channelID: createchannel.id,
            subject,
            embedID: '0',
            isOpen: 'Yes'
        });

        const embed = new (require('discord.js')).MessageEmbed()
            .setColor(message.guild.roles.get('307140805213290506').color)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('You have submitted a request for support. A Man Page will be with you shortly!')
            .setDescription(`**Topic:** ${subject ? subject : 'None'}\nWhile you wait, we ask that you write a short summary of your problem, so we can assist you as fast as possible.`)
            .setTimestamp()
            .setFooter(`Ticket #${res.caseNum}`);
        const m = await this.client.channels.get(createchannel.id).send({ embed });
        const embedID = await this.client.db.scases.update({ embedID: m.id }, { where: { caseNum: res.caseNum } });
        this.client.channels.get('329783240535703553').send(`<@&307140805213290506> There is a person waiting for help in ${createchannel}.`);
        return message.reply(`Your ticket has been created in ${createchannel}.`);
    }

};
