const { Command } = require("discord.js-commando");
const { DiceRoll, exportFormats } = require("rpg-dice-roller");
const Emojis = require ("../../config/emojis.config");
const db = require("../../db/db");

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
        const attributes = await db.getUserAttributes(message.author.id);
        const rollSyntax = this.attributeParser(message.content.split(" ")[1], attributes);
        try {
            const roll = new DiceRoll(rollSyntax);
            const rollObj = roll.export(exportFormats.OBJECT);
            message.say(`Rolls: ${this.getRollsString(rollObj.rolls)}\nTotal: **${rollObj.total}**`);
        } catch (err) {
            message.say(`Invalid roll syntax ${Emojis.bonkCat}`);
        }
    }

    attributeParser(rollSyntax, attributes) {
        const regex = /(?<=\*|\+|\-|\/)(str|dex|con|int|wis|cha)(?=\*|\+|\-|\/)*/g;
        return rollSyntax.replace(regex, match => (attributes[match] || 0));
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