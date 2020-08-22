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
        const channelStates = await StreamActivity.getOnlineChannels();
        if (channelStates.length === 0) {
            message.say("Unfortunately no one is currently live! 😭");
        } else {        
            const messageString = channelStates
                .reduce((str, channelState) => {
                    return `${str}\nhttp://www.twitch.tv/${channelState.username} - ${channelState.streamData.title}`;
                }, "");
            message.say(messageString);
        }
    }
}