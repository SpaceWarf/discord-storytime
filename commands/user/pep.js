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
            },
            args: [
                {
                    key: "count",
                    prompt: "How many messages to send?",
                    type: "integer",
                    default: 1
                }
            ]
        });
    }

    async run(message, { count }) {
        const lastUserMessage = await this.getLastUserMessage(message.channel, message.author.id);
        const isRatRelated = message.content.includes("rat") || lastUserMessage.content.includes("rat");
        const messages = isRatRelated ? [notARat] : [];

        while (messages.length < count) {
            messages.push(pepPhrases[Math.floor(Math.random() * pepPhrases.length)]);
        }
        message.say(messages.join("\n"));
    }

    async getMessagesForUser(channel, userId) {
        let messages = await channel.fetchMessages();
        return messages.filter(message => message.author.id === userId);
    }

    async getLastUserMessage(channel, userId) {
        const userMessages = await this.getMessagesForUser(channel, userId);
        const lastUserMessageTimestamp = userMessages.map(msg => msg.createdTimestamp)[1];
        return userMessages.find(msg => msg.createdTimestamp === lastUserMessageTimestamp);
    }
}