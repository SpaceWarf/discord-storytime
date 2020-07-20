const { Command } = require("discord.js-commando");
const {
    pepPhrases,
    notARat,
    peruMsg,
    fatFuckChance
} = require("../../config/pep.config");
const { Ids } = require("../../config/users.config");
const { getRandomArrayElement } = require("../../utilities/array");
const { getLastUserMessage } = require("../../utilities/messages");

module.exports = class Pep extends Command {
    constructor(client) {
        super(client, {
            name: "pep",
            group: "user",
            memberName: "pep",
            description: "Emulate that stupid bitch.",
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        if (message.author.id === Ids.peru && Math.random() <= fatFuckChance) {
            message.say(peruMsg);
            return;
        }

        const count = this.getCountFromMessage(message.content);
        const lastUserMessage = await getLastUserMessage(message.channel, message.author.id);
        const messages = this.getInitialMessageArray(message, lastUserMessage);

        while (messages.length < Math.min(count, 5)) {
            messages.push(getRandomArrayElement(pepPhrases));
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

    getInitialMessageArray(queryMessage, lastRelatedMessage) {
        const messages = [];
        const queryMsgContent = queryMessage.content.toLowerCase();
        const lastRelatedMsgContent = lastRelatedMessage.content.toLowerCase();
        const isRatRelated = queryMsgContent.includes("rat") || lastRelatedMsgContent.includes("rat");

        if (isRatRelated) {
            messages.push(notARat);
        }

        return messages;
    }
}