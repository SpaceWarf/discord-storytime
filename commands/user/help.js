const { Command } = require("discord.js-commando");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "user",
            memberName: "help",
            description: "Display the list of available commands."
        });
    }

    async run(message) {
        message.channel.send({
            "embed": {
                "color": 3447003,
                "thumbnail": {
                    "url": "https://cdn.discordapp.com/avatars/724375381330886666/0e4bd827beeab78fa5497b52e3e86d3a.png?size=128"
                },
                "author": {
                    "name": "Meowtron 6000 Commands",
                    "url": "https://github.com/SpaceWarf/meowtron-6000",
                    "icon_url": "https://cdn.discordapp.com/avatars/724375381330886666/0e4bd827beeab78fa5497b52e3e86d3a.png?size=128"
                },
                "fields": [
                    {
                        "name": "Storytime",
                        "value": "`!story <story>`\nWatch a nice animated story\nSpecifying no story plays a random one\n\n`!list`\nLists available stories\n⠀"
                    },
                    {
                        "name": "Twitch",
                        "value": "`!live`\nList all live channels\n\n`!streams`\nList all channels (live or not)\n⠀"
                    },
                    {
                        "name": "Chatbots",
                        "value": "`!pep <count>`\nEmulate that stupid bitch\nDefault count is 1 with a max of 5\n\n`!pep8`\nSame as the pep command, but with a single yes/no/maybe answer.\n\n`!frumpkin <count>`\nBecause we all need frumpkin in our lives\nDefault count is 1 with a max of 5\nDon't forget to summon him with a snap\n⠀"
                    },
                    {
                        "name": "Dice Roller",
                        "value": "`!r <rollSyntax>`\nRoll dice to get a random result.\nhttps://greenimp.github.io/rpg-dice-roller/guide/notation/\n\n`!vibecheck`\nVibecheck!\n\n`!peepeepoopoocheck`\nPeepee Poopoo check.\n\n`!attributes`\nCheck your attributes\n⠀"
                    },
                    {
                        "name": "Other",
                        "value": "`!voteban <user>`\nStart a vote to ban a user\nYou can only start a vote on Peruman or yourself\n\nMeowtron's code is freely available [here](https://github.com/SpaceWarf/meowtron-6000)."
                    }
                ]
            }
        });
    }
}