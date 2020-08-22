const { Command } = require("discord.js-commando");
const StreamActivity = require('../../twitch/stream-activity');

module.exports = class Streams extends Command {
    constructor(client) {
        super(client, {
            name: "streams",
            group: "user",
            memberName: "streams",
            description: "List all the streamers (live or not)."
        });
    }

    async run(message) {
        const usernames = await StreamActivity.getAllChannels();
        const messageString = usernames
            .reduce((str, username) => {
                return `${str}\n<http://www.twitch.tv/${username}>`;
            }, "Here's a list of lovely streamers you should go support!");
        message.say(messageString);
    }
}