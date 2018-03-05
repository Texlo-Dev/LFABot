const { Extendable } = require('klasa');

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: ['KlasaMessage'], klasa: true, name: 'awaitDM' });
    }

    async extend(question, time = 60000, embed) {
        await (embed ? this.send(question, { embed }) : this.author.send(question));
        const channel = await this.member.createDM();
        return channel.awaitMessages(msg => msg.author.id === this.author.id,
            { max: 1, time, errors: ['time'] })
            .then(msgs => msgs.first().content)
            .catch(() => false);
    }

};
