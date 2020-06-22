const { Command } = require("discord.js-commando");
const stories = require("../config/stories.config");

module.exports = class Storytime extends Command {
    constructor(client) {
        super(client, {
            name: 'storytime',
            group: 'user',
            memberName: 'storytime',
            description: 'Watch a nice story.',
            args: [
                {
                    key: 'story',
                    prompt: 'What do you want to see?',
                    type: 'string'
                }
            ]
        });
        this.loopCntr = 0;
    }

    renderFrames(frames, message) {
        setTimeout(() => {
            message.edit(frames[this.loopCntr]);
            this.loopCntr++;
            if (this.loopCntr < frames.length) {
                this.renderFrames(frames, message);
            }
        }, 1000);
    }

    async run(message, { story }) {
        const frames = stories[story];
        let sentMessage = await message.say(frames[0]);
        this.renderFrames(frames.slice(1, frames.length), sentMessage);
    }
}