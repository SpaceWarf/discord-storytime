require('dotenv').config();
const path = require('path');
const commando = require('discord.js-commando');
const TwitchMonitor = require('./twitch/twitch-monitor');
const StreamActivity = require('./twitch/stream-activity');
const {
    alertChannel,
    roleToPing,
    roleAssignmentChannel,
    roleAssignmentMessage,
    pingInterval,
    offlineInterval
} = require('./config/twitch.config');
const CustomEmbed = require('./twitch/custom-embed');
const { Ids, Roles } = require("./config/users.config");
const Emojis = require("./config/emojis.config");

const prefix = '!';

const client = new commando.Client({
    commandPrefix: prefix,
    owner: [Ids.space],
    unknownCommandResponse: false,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'User Commands']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', async () => {
    console.log('[Bot] Connected as ' + client.user.tag);
    TwitchMonitor.start();

    const roleChannel = client.channels.get(roleAssignmentChannel);
    roleChannel.fetchMessage(roleAssignmentMessage)
        .catch(async () => {
            const roleMsg = await roleChannel.send(`React to this message with ${Emojis.checkmark} to be assigned the <@&${roleToPing}> role and be notified when channels go online.\nTo stop being notified, react instead with ${Emojis.xmark} and the role will be removed.`);
            roleMsg.react(Emojis.checkmark);
            roleMsg.react(Emojis.xmark);
        });

    const me = await client.fetchUser(Ids.space);
    me.send("[Bot] Bot successfully started.");
});

client.on('guildMemberAdd', member => {
    if (member.id === Ids.peru) {
        member.setRoles([Roles.punchingBag]);
        member.setNickname("Peruman-faced stink bug");
        console.log(`[Bot] Set role and nickname of Peruman`);
    }
});

client.on('message', message => {
    if ([Ids.peru].includes(message.author.id)) {
        const emojis = Object.values(Emojis).reduce((arr, emoji) => {
            const id = emoji.match(/:\d*>/g);

            if (id) {
                arr.push({
                    name: emoji.match(/:.*:/g)[0],
                    id: id[0].slice(1, id[0].length - 1)
                });
            }

            return arr;
        }, []);

        const matchedEmojis = emojis.filter(emoji => message.content.includes(emoji.name));
        if (matchedEmojis) {
            matchedEmojis.forEach(emoji => {
                message.react(emoji.id);
                console.log(`[Bot] Reacted to a message with emoji ${emoji.id}`);
            });
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if (
        reaction.message.id !== roleAssignmentMessage
        || client.user.id === user.id
    ) { return; }

    if (reaction.emoji.name == Emojis.checkmark) {
        reaction.message.guild.fetchMember(user.id).then(member => {
            member.addRole(roleToPing);
            console.log(`[Bot] Given ping role to ${user.username}`);
        });
    }

    if (reaction.emoji.name == Emojis.xmark) {
        reaction.message.guild.fetchMember(user.id).then(member => {
            member.removeRole(roleToPing);
            console.log(`[Bot] Removed ping role from ${user.username}`);
        });
    }

    reaction.remove(user);
});

/**
 * Twitch integration based on the Timbot from github:
 * https://github.com/roydejong/timbot/tree/fd16e7fe706ea8e9b19e3fbff29aa45f463a0585
 */
TwitchMonitor.onChannelLiveUpdate(async (streamData, isOnline) => {
    const isChannelCurrentlyLive = await StreamActivity.isChannelOnline(streamData);

    if (isOnline && !isChannelCurrentlyLive) {
        StreamActivity.setChannelOnline(streamData);

        if (await isReadyForPing(streamData)) {
            const channel = client.channels.get(alertChannel);
            CustomEmbed.getCustomAlertMessage(streamData)
                .then(message => {
                    channel.send(message.content, {
                        embed: message.embed
                    });
                    StreamActivity.setChannelLastPingTimestamp(streamData);
                    console.log(`[Bot] Sent live notification for ${streamData.user_name}`);
                });
        }
    }
});

const isReadyForPing = async streamData => {
    const lastPingTimestamp = await StreamActivity.getChannelLastPingTimestamp(streamData);
    const lastOfflineTimestamp = await StreamActivity.getChannelLastOfflineTimestamp(streamData);

    const now = new Date().getTime();
    const enoughTimeBetweenPings = !lastPingTimestamp || now -lastPingTimestamp.getTime() > pingInterval;
    const enoughTimeOffline = !lastOfflineTimestamp || now - lastOfflineTimestamp.getTime() > offlineInterval;

    return enoughTimeBetweenPings && enoughTimeOffline;
};

TwitchMonitor.onChannelOffline((streamData) => {
    StreamActivity.setChannelOffline(streamData);
    StreamActivity.setChannelLastOfflineTimestamp(streamData);
});

client.login(process.env.TOKEN);