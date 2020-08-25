const ChannelStateModel = require('./models/channel-state');
const DiscordConfigModel = require('./models/discord-config');
const CustomTwitchAlertModel = require('./models/custom-twitch-alerts');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');

class Database {
    static async getDiscordConfig() {
        return await DiscordConfigModel.findOne({ current: true });
    }

    static updateRoleAssignmentMessageConfig(id) {
        console.log(`[DB] Setting role assignment message id of current config to ${id}`);
        DiscordConfigModel.updateOne(
            { current: true },
            { roleAssignmentMessage: id }
        ).exec();
    }

    static async getCustomTwitchAlerts() {
        return await CustomTwitchAlertModel.find({});
    }

    static async getDiscordUsersMap() {
        const users = await UserModel.find({});
        const usersMap = new Map();

        users.forEach(user => {
            usersMap[user.username] = user.id;
        });

        return usersMap;
    }

    static async getDiscordRolesMap() {
        const roles = await RoleModel.find({});
        const rolesMap = new Map();

        roles.forEach(role => {
            rolesMap[role.name] = role.id;
        });

        return rolesMap;
    }

    static async getAllChannels() {
        const channelStates = await ChannelStateModel
            .find({})
            .select('username')
            .sort('username');
        return channelStates.map(channel => channel.username);
    }

    static setChannelState(username, online, streamData) {
        console.log(`[DB] Setting user ${username} online state to ${online}`);
        ChannelStateModel.updateOne(
            { username },
            { online, streamData }
        ).exec();
    }

    static setChannelLastPingTimestamp(username) {
        const now = new Date().getTime();
        console.log(`[DB] Setting user ${username} last ping timestamp to ${now}`);
        ChannelStateModel.updateOne(
            { username },
            { lastPing: now }
        ).exec();
    }

    static async getChannelLastPingTimestamp(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select("lastPing");
        return channelState.lastPing;
    }

    static setChannelLastOfflineTimestamp(username) {
        const now = new Date().getTime();
        console.log(`[DB] Setting user ${username} last set offline timestamp to ${now}`);
        ChannelStateModel.updateOne(
            { username },
            { lastSetOffline: now }
        ).exec();
    }

    static async getChannelLastOfflineTimestamp(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select("lastSetOffline");
        return channelState.lastSetOffline;
    }

    static async getChannelsByState(online) {
        return ChannelStateModel.find({ online });
    }

    static async isChannelOnline(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select('online');
        return channelState.online;
    }
}

module.exports = Database;