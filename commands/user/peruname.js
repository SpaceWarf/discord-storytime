const { Command } = require("discord.js-commando");
const db = require("../../db/db");
const Emojis = require("../../config/emojis.config");

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "peruname",
            group: "user",
            memberName: "peruname",
            description: "Update to username set on join for user Peruman."
        });
    }

    async run(message) {
        if (
            message.author.id === this.client.users.space
            || message.author.id === this.client.users.peru
        ) {
            const username = message.content
                .replace("~peruname", "")
                .trim();
            if (username) {
                db.setPeruname(username);
                this.client.dataState.peruname = username;
            } else {
                message.say(`Invalid username ${Emojis.bonkCat}`);
            }
        } else {
            message.say(`Only users Space_warf and Peruman can use this command.`);
        }
    }
}