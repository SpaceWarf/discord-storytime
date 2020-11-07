const { Command } = require("discord.js-commando");
const Emojis = require("../../config/emojis.config");

module.exports = class List extends Command {
    constructor(client) {
        super(client, {
            name: "react",
            group: "user",
            memberName: "react",
            description: "React with emojis to a message.",
            args: [
                {
                    key: "text",
                    prompt: "What text do you want to react with?",
                    type: "string"
                },
                {
                    key: "id",
                    prompt: "Which message do you want to react to (enter its id)?",
                    type: "string"
                }
            ]
        }
        );
    }

    async run(message, { text, id }) {
        if (message.author.id === this.client.discordUsers.space) {
            const msgToReact = await message.channel.messages.fetch(id);
            const emojis = this.getEmojisFromText(text);
            await message.delete();

            emojis.forEach(async emoji => {
                await msgToReact.react(emoji);
            });
        }
    }

    getEmojisFromText(text) {
        let emojiNames = text
            .split("")
            .map(char => `letter_${char}`);
        emojiNames = this.renameDuplicates(emojiNames);
        return emojiNames
            .filter(name => Emojis[name])
            .map(name => this.getIdFromEmoji(Emojis[name]));
    }

    getIdFromEmoji(emoji) {
        const id = emoji.match(/:\d*>/g);
        return id
            ? id[0].slice(1, id[0].length - 1)
            : emoji;
    }

    renameDuplicates(emojis) {
        const count = {};
        return emojis.map(emoji => {
            if (emoji in count) {
                count[emoji]++;
                return `${emoji}_${count[emoji]}`;
            }
            count[emoji] = 1;
            return emoji;
        });
    }
}