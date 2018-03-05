const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'gethelp',
            enabled: true,
            description: 'Get help from a server manpage.',
            runIn: ['text', 'dm'],
            guildOnly: true
        });
    }

    async run(message) {
        message.react(message.guild.emojis.get('350801315317809152'));
        const m1 = await message.awaitDM('Welcome to the manpages™ support desk. Here you may request help from one of our manpages. First, we will need some basic info from you about your problem.\nIn one sentence, name your problem/question.');
        if (!m1) return message.author.send('Time limit exceeded, cancelling now.');
        const m2 = await message.awaitDM('Okay, got it. Now in a few short sentences, explain more about your problem. Make sure to include proper detail, so we can better assist you.');
        if (!m2) return message.author.send('Time limit exceeded, cancelling now.');
        const m3 = await message.awaitDM('How would you rate your experience with Linux? Poor, Fair, Great, or Excellent?');
        if (!m3) return message.author.send('Time limit exceeded, cancelling now.');
        const m4 = await message.awaitDM(`Alright, is this correct?\n\n**Title:** ${m1}\n**Description:** ${m2}\n**Experience with Linux:** ${m3}\n\nReply yes, to continue, or no to cancel and start over.`);
        if (!m4) return message.author.send('Ok, cancelling support ticket now.');

        const cases = await this.client.db.scases.count();
        const res = await this.client.db.scases.create({
            userID: message.author.id,
            caseNum: cases + 1, title: m1,
            description: m2,
            experience: m3,
            manpage: '0',
            channelID: '0',
            embedID: '0',
            isOpen: 'Yes'
        });
        if (!res) return message.author.send(`There was an an error sending this support ticket. Please report this error to ${this.client.owner}.`);
        message.author.send('Your ticket has been submitted. A manpage will be with you shortly!');


        const embed = new (require('discord.js')).MessageEmbed()
            .setColor(message.guild.roles.get('307140805213290506').color)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('Submitted a support ticket.')
            .setDescription(`**${m1}**\n${m2}\n**Experience with Linux:** ${m3}\nTo take up this ticket, run ${message.guild.configs.prefix}ticketaccept <ticket#>.`)
            .setTimestamp()
            .setFooter(`Ticket #${res.caseNum}`);
        const m = await this.client.channels.get('419967098576699403').send({ embed });
        const embedID = await this.client.db.scases.update({ embedID: m.id }, { where: { caseNum: res.caseNum } });
    }

};
