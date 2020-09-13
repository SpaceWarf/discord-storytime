const { Command } = require("discord.js-commando");
const { getFile } = require("../../utilities/mp3");

module.exports = class Say extends Command {
    constructor(client) {
        super(client, {
            name: "leave",
            group: "user",
            memberName: "leave",
            description: "Leave the current voice channel."
        });
    }

    async run(message) {
        const clientVoiceChannel = message.member.voiceChannelID;
        const botVoiceChannel = this.client.connection
            ? this.client.connection.channel.id
            : undefined;

        if (!botVoiceChannel) {
            message.say("The bot isn't connected.");
        } else if (!clientVoiceChannel || botVoiceChannel !== clientVoiceChannel) {
            message.say("You need to be in the bot's voice channel to use this command.");
        } else {
            this.client.connection.playFile(getFile("reeeeeeeeee"));

            const context = this;
            setTimeout(async () => {
                await context.client.connection.disconnect();
                delete context.client.connection;
            }, 2000);
        }
    }
}