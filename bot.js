require('dotenv').config();
const path = require('path');
const commando = require('discord.js-commando');

const prefix = '!';

const client = new commando.Client({
    commandPrefix: prefix,
    owner: ['132972681703194625'],
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'User Commands']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
});

client.login(process.env.TOKEN);