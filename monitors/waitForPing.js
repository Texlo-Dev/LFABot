const {
	Monitor
} = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: true,
			ignoreBots: false,
			ignoreSelf: true,
			ignoreOthers: false,
			ignoreWebhooks: true,
			ignoreEdits: true
		});
	}

	async run(message) {
		let rs = this.client.settings.pingAvailable;
		if (!rs.length) return;
		for (let r of rs) {
			if (!message.content.includes(`<@&${r}>`)) return;
			try {
				await message.guild.roles.get(r).setMentionable(false);
			} catch (ex) {
				message.reply(ex.toString());
			}
			await this.client.settings.update('pingAvailable', r, {
				action: 'remove'
			});
		}
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};