const { Client } = require('klasa');
class LFAClient extends Client {

    constructor(options) {
        super(options);
        this.db = require('./models/db');
    }

}

module.exports = LFAClient;
