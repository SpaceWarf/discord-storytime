const { Command } = require("discord.js-commando");
const stories = require("../config/stories.config");

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

    async addRepeatOption(frames, message) {
        const filter = reaction => {
            return repeatEmoji === reaction.emoji.name;
        };

        await message.react(repeatEmoji);
        await message.awaitReactions(filter, { max: 2 });
        await message.reactions.get(repeatEmoji).remove();
        this.renderFrames(frames, message);
    }

    renderFrames(frames, message) {
        setTimeout(() => {
            message.edit(frames[this.loopCntr]);
            this.loopCntr++;
            if (this.loopCntr < frames.length) {
                this.renderFrames(frames, message);
            } else {
                this.loopCntr = 0;
                // this.addRepeatOption(frames, message);
            }
        }, 1500);
    }

    async run(message, { storyName }) {
        const story = stories[storyName];
        if (!story) {
            await message.say("No story with that name. Use **!list** to see all the available stories.");
        } else {
            this.renderFrames(
                story.frames.slice(1, story.frames.length),
                await message.say(story.frames[0])
            );
        }
    }
}