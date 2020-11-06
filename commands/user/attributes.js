const { Command } = require("discord.js-commando");
const { DiceRoll, exportFormats } = require("rpg-dice-roller");
const Emojis = require ("../../config/emojis.config");
const db = require("../../db/db");

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "attributes",
            group: "user",
            memberName: "attributes",
            description: "Check you attributes."
        });
    }

    async run(message) {
        const attributes = await db.getUserAttributes(message.author.id);
        message.say(`Strength: ${attributes.str || 0}\nDexterity: ${attributes.dex || 0}\nConstitution: ${attributes.con || 0}\nIntelligence: ${attributes.int || 0}\nWisdom: ${attributes.wis || 0}\nCharisma: ${attributes.cha || 0}`);
    }
}