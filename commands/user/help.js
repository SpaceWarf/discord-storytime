const { Command } = require("discord.js-commando");
const stories = require("../config/stories.config");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "user",
            memberName: "help",
            description: "Display the list of available commands."
        });
    }

    async run(message) {
        message.say(`**!list**: Lists available stories\n**!storytime <story>**: Watch a nice story`);
    }
}