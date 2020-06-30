const { Command } = require("discord.js-commando");
const StreamActivity = require('../../twitch/stream-activity');

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "live",
            group: "user",
            memberName: "live",
            description: "List all the currently live streamers."
        });
    }

    async run(message) {
        const live = StreamActivity.getOnlineChannels();
        const messageString = Object.values(live)
            .reduce((str, stream) => {
                return `${str}\nhttp://www.twitch.tv/${stream.user_name} - ${stream.title}`;
            }, "");

        if (messageString === "") {
            message.say("Unfortunately no one is currently live! 😭");
        } else {
            message.say(messageString);
        }
    }
}