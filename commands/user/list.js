const { Command } = require("discord.js-commando");
const stories = require("../../config/stories.config");

module.exports = class List extends Command {
    constructor(client) {
        super(client, {
            name: "list",
            group: "user",
            memberName: "list",
            description: "List all the available stories."
        });
    }

    async run(message) {
        const messageString = Object.keys(stories)
            .reduce((str, key) => {
                return `${str}\n**${key}**: ${stories[key].description}`;
            }, "");
        message.say(messageString);
    }
}