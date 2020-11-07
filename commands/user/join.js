const { Command } = require("discord.js-commando");
const { getFile } = require("../../utilities/mp3");

module.exports = class Join extends Command {
    constructor(client) {
        super(client, {
            name: "join",
            group: "user",
            memberName: "join",
            description: "Join the user's current voice channel."
        });
    }

    async run(message) {
        // Command under development.
        return;
        const voiceChannel = message.member.voiceChannelID;

        if (this.connection) {
            message.say("Bot is already connected.");
        } else if (!voiceChannel) {
            message.say("You need to be in a voice channel to use this command.");
        } else {
            this.client.connection = await this.client.channels.fetch(voiceChannel).join();
            this.client.connection.playFile(getFile('cheesed'));
            console.log('[Bot] playing cheesed audio sound.');
        }
    }
}