const { Command } = require("discord.js-commando");
const { pepPhrases, notARat } = require("../../config/pep.config");

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
        const count = this.getCountFromMessage(message.content);
        const lastUserMessage = await this.getLastUserMessage(message.channel, message.author.id);
        const messages = this.getInitialMessageArray(message, lastUserMessage);

        while (messages.length < Math.min(count, 5)) {
            messages.push(pepPhrases[Math.floor(Math.random() * pepPhrases.length)]);
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

    async getMessagesForUser(channel, userId) {
        let messages = await channel.fetchMessages();
        return messages.filter(message => message.author.id === userId);
    }

    async getLastUserMessage(channel, userId) {
        const userMessages = await this.getMessagesForUser(channel, userId);
        const lastUserMessageTimestamp = userMessages.map(msg => msg.createdTimestamp)[1];

        // If the last found message if older than one minute, it's probably not related to the command
        if (lastUserMessageTimestamp < (new Date()).getTime() - 60000) {
            return { content: "" };
        }

        return userMessages.find(msg => msg.createdTimestamp === lastUserMessageTimestamp)
            || { content: "" };
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