const { Command } = require("discord.js-commando");
const {
    pepYes,
    pepNo,
    pepMaybe,
    notARat,
    peruMsg,
    fatFuckChance,
    noQuestion
} = require("../../config/pep.config");
const { getRandomArrayElement } = require("../../utilities/array");
const { getLastUserMessages } = require("../../utilities/messages");

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
        if (message.author.id === this.client.discordUsers.peru && Math.random() <= fatFuckChance) {
            message.say(peruMsg);
            return;
        }

        if (message.author.id === this.client.discordUsers.pep && Math.random() <= sassChance) {
            message.say(getRandomArrayElement(peptronSass));
            return;
        }

        const lastUserMessages = await getLastUserMessages(message.channel, message.author.id);
        message.say(
            this.getMessage(message.content, lastUserMessages)
        );
    }

    getMessage(queryMsgContent, lastRelatedMessages) {
        const isRatRelated = lastRelatedMessages
            .some(message => message.content.toLowerCase().includes("rat"));

        if (isRatRelated) {
            return notARat;
        }

        if (
            queryMsgContent.replace(/(!|~)pep8/g, "").length === 0 
            && lastRelatedMessages.every(msg => msg.content.replace(/(!|~)pep8/g, "").length === 0)
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