const { Command } = require("discord.js-commando");
const { pepPhrases } = require("../../config/pep.config");

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
      for (let i = 0; i < Math.min(count, 5); i++) {
        message.say(pepPhrases[Math.floor(Math.random() * pepPhrases.length)]);
      }
    }
}