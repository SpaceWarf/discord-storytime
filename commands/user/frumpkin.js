const { Command } = require("discord.js-commando");
const { frumpkinPhrases, eatsPep } = require("../../config/frumpkin.config");
const { Ids } = require("../../config/users.config");
const { getRandomArrayElement } = require("../../utilities/array");

module.exports = class Frumpkin extends Command {
  constructor(client) {
    super(client, {
      name: "frumpkin",
      group: "user",
      memberName: "frumpkin",
      description: "Because we all need frumpkin in our lives.",
      throttling: {
        usages: 1,
        duration: 5
      }
    });
  }

  async run(message) {
    const count = this.getCountFromMessage(message.content);
    const messages = [];

    while (messages.length < Math.min(count, 5)) {
      messages.push(
        getRandomArrayElement(
          message.author.id === Ids.pep
            ? [...frumpkinPhrases, eatsPep]
            : frumpkinPhrases
        )
      );
    }
    message.say(messages.join("\n"));
  }

  getCountFromMessage(message) {
    let count = 1;
    const countArg = message.split(" ")[1];
    if (!isNaN(countArg)) {
      count = +countArg;
    }
    return count;
  }
}