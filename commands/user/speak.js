const { Command } = require("discord.js-commando");
const { getFile, getRandomFile } = require("../../utilities/mp3");

module.exports = class Speak extends Command {
    constructor(client) {
        super(client, {
            name: "speak",
            group: "user",
            memberName: "speak",
            description: "Say dumb stuff in the voice channel."
        });
    }

    async run(message) {
        const clientVoiceChannel = message.member.voiceChannelID;
        const botVoiceChannel = this.client.connection
            ? this.client.connection.channel.id
            : undefined;

        if (clientVoiceChannel && !botVoiceChannel) {
            this.client.connection = await this.client.channels.get(clientVoiceChannel).join();
            this.client.connection.playFile(getFile('cheesed'));
            console.log('[Bot] playing cheesed audio sound.');
        } else if (!clientVoiceChannel || botVoiceChannel !== clientVoiceChannel) {
            message.say("You need to be in the bot's voice channel to use this command.");
        } else {
            this.client.connection.playFile(getRandomFile());
            console.log('[Bot] playing random audio sound.');
        }
    }
}