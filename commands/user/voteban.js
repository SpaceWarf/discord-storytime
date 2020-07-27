const { Command } = require("discord.js-commando");
const { Ids } = require("../../config/users.config");
const { kickPhrases, stayPhrases } = require("../../config/peru.config");
const { getRandomArrayElement } = require("../../utilities/array");

const checkmark = "✅";
const xmark = "❌";

module.exports = class Voteban extends Command {
    constructor(client) {
        super(client, {
            name: "voteban",
            group: "user",
            memberName: "voteban",
            description: "Fuck you peru.",
            throttling: {
                usages: 1,
                duration: 60
            }
        });
        this.activeVote = false;
    }

    async run({ message }) {
        const user = message.mentions.members.first();

        const filter = reaction => {
            return [checkmark, xmark].includes(reaction.emoji.name);
        };

        if (user && (user.id === Ids.peru || user.id === message.author.id)) {
            if (this.activeVote) {
                message.channel.send("There's already an active vote! Go vote!");
                return;
            }
            this.activeVote = true;
            await message.react(checkmark);
            await message.react(xmark);

            const collector = message.createReactionCollector(filter, { time: 30000 });

            collector.on("end", async reactions => {
                this.activeVote = false;
                const yesVotes = this.getReactioncount(reactions, checkmark);
                const noVotes = this.getReactioncount(reactions, xmark);

                message.channel
                    .send(`The vote has ended, here are the results:\n  ${checkmark} - ${yesVotes}\n  ${xmark} - ${noVotes}`)

                if (yesVotes > noVotes) {
                    this.kick(user, message.channel);
                } else if (yesVotes < noVotes) {
                    message.channel.send(getRandomArrayElement(stayPhrases));
                } else {
                    await message.channel.send("🎲 Randomly selecting an outcome.");
                    if (Math.random() > 0.5) {
                        this.kick(user, message.channel);
                    } else {
                        message.channel.send(getRandomArrayElement(stayPhrases));
                    }
                }
            });
        } else {
            message.channel.send("You can only ban Peruman or yourself.");
        }
    }

    async kick(user, channel) {
        channel.send(getRandomArrayElement(kickPhrases));
        setTimeout(async () => {
            await user.kick();
        }, 3000);
    }

    getReactioncount(reactions, emoji) {
        if (reactions.get(emoji)) {
            return reactions.get(emoji).count;
        }
        return 1;
    }
}