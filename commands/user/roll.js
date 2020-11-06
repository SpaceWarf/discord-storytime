const { Command } = require("discord.js-commando");
const { DiceRoll, exportFormats } = require("rpg-dice-roller");
const Emojis = require ("../../config/emojis.config");

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "r",
            group: "user",
            memberName: "roll",
            description: "Roll dice to get a random result."
        });
    }

    async run(message) {
        const rollSyntax = message.content.split(" ")[1];
        try {
            const roll = new DiceRoll(rollSyntax);
            const rollObj = roll.export(exportFormats.OBJECT);
            message.say(`Rolls: ${this.getRollsString(rollObj.rolls)}\nTotal: **${rollObj.total}**`);
        } catch (err) {
            message.say(`Invalid roll syntax ${Emojis.bonkCat}`);
        }
    }

    getRollsString(rolls) {
        return rolls.reduce((allRollsString, rollGroup) => {
            if (rollGroup.rolls) {
                const rollGroupStr = rollGroup.rolls.reduce((str, roll, index) => {
                    return `${str}${index === 0 ? "" : ", "}${roll.useInTotal ? roll.value : `~~${roll.value}~~`}`;
                }, "");
                return `${allRollsString} [${rollGroupStr}]`;
            }
            return `${allRollsString} ${rollGroup}`;
        }, "");
    }
}