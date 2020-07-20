const { Command } = require("discord.js-commando");
const {
    pepYes,
    pepNo,
    pepMaybe,
    notARat,
    peruId,
    peruMsg,
    fatFuckChance,
    noQuestion
} = require("../../config/pep.config");
const { getRandomArrayElement } = require("../../utilities/array");
const { getLastUserMessage } = require("../../utilities/messages");

module.exports = class Pep8 extends Command {
    constructor(client) {
        super(client, {
            name: "pep8",
            group: "user",
            memberName: "pep8",
            description: "Same as the pep command, but with a single yes/no/maybe answer.",
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        if (message.author.id === peruId && Math.random() <= fatFuckChance) {
            message.say(peruMsg);
            return;
        }

        const lastUserMessage = await getLastUserMessage(message.channel, message.author.id);
        message.say(
            this.getMessage(message, lastUserMessage)
        );
    }

    getMessage(queryMessage, lastRelatedMessage) {
        const queryMsgContent = queryMessage.content.toLowerCase();
        const lastRelatedMsgContent = lastRelatedMessage.content.toLowerCase();
        const isRatRelated = queryMsgContent.includes("rat") || lastRelatedMsgContent.includes("rat");

        if (isRatRelated) {
            return notARat;
        }

        if (
            queryMsgContent.replace(/(!|~)pep8/g, "").length === 0 
            && lastRelatedMsgContent.replace(/(!|~)pep8/g, "").length === 0
        ) {
            return noQuestion;
        }

        return getRandomArrayElement([
            ...pepYes,
            ...pepNo,
            ...pepMaybe
        ]);
    }
}