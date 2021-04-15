const { Command } = require("discord.js-commando");
const { DiceRoll } = require("rpg-dice-roller");
const Emojis = require ("../../config/emojis.config");

module.exports = class Live extends Command {
    constructor(client) {
        super(client, {
            name: "vibecheck",
            group: "user",
            memberName: "vibecheck",
            description: "Vibecheck!"
        });
    }

    async run(message, { dice }) {
      const roll = new DiceRoll("d20");
      if (roll.total === 20) {
        message.say(`${roll.total} ${Emojis.dogdance}`);
      } else if (roll.total === 1) {
        message.say(`${roll.total} ${Emojis.crycat}`);
      } else if (roll.total > 10) {
        message.say(`${roll.total} ${Emojis.dancingbaby}`);
      } else {
        message.say(`${roll.total} ${Emojis.ocry}`);
      }
    }
}
