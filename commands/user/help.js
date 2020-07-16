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
                        "value": "`!story <story>`\nWatch a nice animated story\n\n`!list`\nLists available stories\n⠀"
                    },
                    {
                        "name": "Twitch",
                        "value": "`!live <story>`\nList all live channels\n\n`!streams`\nList all channels (live or not)\n\nMeowtron's code is freely available [here](https://github.com/SpaceWarf/meowtron-6000)."
                    }
                ]
            }
        });
    }
}