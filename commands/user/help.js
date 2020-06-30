const { Command } = require("discord.js-commando");

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
        message.say(
            `__**Storytime**__`
            + `\n**!storytime <story>** - Watch a nice story`
            + `\n**!list** - Lists available stories`

            + `\n\n__**Twitch**__`
            + `\n**!live** - List all live channels`
            + `\n**!streams** - List all channels (live or not)`
        );
    }
}