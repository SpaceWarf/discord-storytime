const { Command } = require("discord.js-commando");
const { DiceRoll } = require("rpg-dice-roller");
const Emojis = require ("../../config/emojis.config");

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "peepeepoopoocheck",
            group: "user",
            memberName: "peepeepoopoocheck",
            description: "Peepee poopoo check."
        });
    }

    async run(message) {
        const peepee = new DiceRoll("d20");
        const poopoo = new DiceRoll("d20");
        const peepeeStr = peepee.total === 20 ? `**${peepee.total}**` : peepee.total;
        const poopooStr = poopoo.total === 20 ? `**${poopoo.total}**` : poopoo.total;
        message.say(`Peepee: ${peepeeStr}\nPoopoo: ${poopooStr}`);
        if (peepee.total === 20 && poopoo.total === 20) {
            message.say(`I bequeath you the Peepee Poopoo God title ${Emojis.bobDance}`);
        } else if (peepee.total === 1 && poopoo.total === 1) {
            message.say(`...damn ${Emojis.sadChamp}`);
        } else if (peepee.total === poopoo.total) {
            message.say(`Perfectly balanced, as all things should be ${Emojis.thanos}`);
        } else if (peepee.total === 6 && poopoo.total === 9) {
            message.say("Nice.");
        }
    }
}