require('dotenv').config();
const path = require('path');
const commando = require('discord.js-commando');
const TwitchMonitor = require('./twitch/twitch-monitor');
const StreamActivity = require('./twitch/stream-activity');
const { alertChannel } = require('./config/twitch.config');
const CustomEmbed = require('./twitch/custom-embed');
const { Ids, Roles } = require("./config/users.config");
const Emojis = require("./config/emojis.config");

const prefix = '!';

const client = new commando.Client({
    commandPrefix: prefix,
    owner: [Ids.space],
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'User Commands']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('[Bot] Connected as ' + client.user.tag);
    StreamActivity.init();
    TwitchMonitor.start();
});

client.on('guildMemberAdd', member => {
    if (member.id === Ids.peru) {
        member.setRoles([Roles.punchingBag]);
        member.setUsername("Peruman-faced stink bug");
    }
});

client.on('message', message => {
    if (message.author.id === Ids.peru) {
        const emojis = Object.values(Emojis).reduce((arr, emoji) => {
            const id = emoji.match(/:\d*>/g)[0];
            arr.push({
                name: emoji.match(/:.*:/g)[0],
                id: id.slice(1, id.length - 1)
            });
            return arr;
        }, []);

        const matchedEmoji = emojis.find(emoji => message.content.includes(emoji.name));
        if (matchedEmoji) {
            message.react(matchedEmoji.id);
        }
    }
});

/**
 * Twitch integration based on the Timbot from github:
 * https://github.com/roydejong/timbot/tree/fd16e7fe706ea8e9b19e3fbff29aa45f463a0585
 */
TwitchMonitor.onChannelLiveUpdate((streamData, isOnline) => {
    if (isOnline && !StreamActivity.isChannelOnline(streamData)) {
        StreamActivity.setChannelOnline(streamData);
        const channel = client.channels.find('name', alertChannel);
        CustomEmbed.getCustomAlertMessage(streamData)
            .then(message => {
                channel.send(message.content, {
                    embed: message.embed
                });
            });
    }
});

TwitchMonitor.onChannelOffline((streamData) => {
    StreamActivity.setChannelOffline(streamData);
});

client.login(process.env.TOKEN);