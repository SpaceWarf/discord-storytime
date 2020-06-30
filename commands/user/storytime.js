const { Command } = require("discord.js-commando");
const stories = require("../../config/stories.config");

const repeatEmoji = "🔁";

module.exports = class Storytime extends Command {
    constructor(client) {
        super(client, {
            name: "storytime",
            aliases: ["story"],
            group: "user",
            memberName: "storytime",
            description: "Watch a nice story.",
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [
                {
                    key: "storyName",
                    prompt: "What story do you want to see?",
                    type: "string"
                }
            ]
        });
        this.loopCntr = 0;
    }

    renderFrames(frames, message) {
        setTimeout(() => {
            this.loopCntr++;
            message.edit(frames[this.loopCntr]);
            if (this.loopCntr < frames.length) {
                this.renderFrames(frames, message);
            } else {
                this.loopCntr = 0;
            }
        }, 1500);
    }

    async run(message, { storyName }) {
        const story = stories[storyName];
        if (!story) {
            await message.say("No story with that name. Use **!list** to see all the available stories.");
        } else {
            this.renderFrames(
                story.frames,
                await message.say(story.frames[0])
            );
        }
    }
}
