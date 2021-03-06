const { Command } = require("discord.js-commando");
const { frumpkinPhrases, eatsPep, snapIn, snapOut, notHere } = require("../../config/frumpkin.config");
const { getRandomArrayElement } = require("../../utilities/array");
const db = require("../../db/db");

module.exports = class Frumpkin extends Command {
    constructor(client) {
        super(client, {
            name: "frumpkin",
            group: "user",
            memberName: "frumpkin",
            description: "Because we all need frumpkin in our lives.",
            throttling: {
                usages: 1,
                duration: 5
            }
        });

        this.exists = this.client.dataState.frumpkin;
    }

    async run(message) {
        const count = this.getCountFromMessage(message.content);

        if (message.content.includes("snap")) {
            this.executeSnap(message);
            return;
        } else if (!this.exists) {
            message.say(notHere);
            return;
        }

        const messages = [];
        while (messages.length < Math.min(count, 5)) {
            messages.push(this.getRandomMessage(message));
        }
        message.say(messages.join("\n"));
    }

    getCountFromMessage(message) {
        let count = 1;
        const countArg = message.split(" ")[1];
        if (!isNaN(countArg)) {
            count = +countArg;
        }
        return count;
    }

    executeSnap(message) {
        this.exists = !this.exists;
        db.updateFrumpkinState(this.exists);

        if (this.exists) {
            message.say(
                `${snapIn}\n${this.getRandomMessage(message)}`
            );
        } else {
            message.say(snapOut);
        }
    }

    getRandomMessage(message) {
        if (message.author.id === this.client.discordUsers.pep) {
            return getRandomArrayElement(
                [...frumpkinPhrases, eatsPep]
            );
        }

        return getRandomArrayElement(frumpkinPhrases);
    }
}