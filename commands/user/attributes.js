const { Command } = require("discord.js-commando");
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
        const character = await db.getUserCharacter(message.author.id);
        message.channel.send({
            "embed": {
                "color": 3447003,
                "author": {
                    "name": this.getSheetTitle(message.author.username, character),
                    "icon_url": message.author.avatarURL
                },
                "fields": [
                    {
                        "name": "Strength",
                        "value": character.attributes.str || 0,
                        inline: true
                    },
                    {
                        "name": "Dexterity",
                        "value": character.attributes.dex || 0,
                        inline: true
                    },
                    {
                        "name": "Constitution",
                        "value": character.attributes.con || 0,
                        inline: true
                    },
                    {
                        "name": "Intelligence",
                        "value": character.attributes.int || 0,
                        inline: true
                    },
                    {
                        "name": "Wisdom",
                        "value": character.attributes.wis || 0,
                        inline: true
                    },
                    {
                        "name": "Charisma",
                        "value": character.attributes.cha || 0,
                        inline: true
                    }
                ]
            }
        });
    }

    getSheetTitle(name, character) {
        if (character.race && character.class) {
            return `${name} - ${character.race} ${character.class}`;
        }

        if (!character.race && character.class) {
            return `${name} - ${character.class}`;
        }

        if (!character.class && character.race) {
            return `${name} - ${character.race}`;
        }
        
        return name;
    }
}