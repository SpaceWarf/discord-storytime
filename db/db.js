const mongoose = require('mongoose');
const ChannelStateModel = require('./models/channel-state');
const DiscordConfigModel = require('./models/discord-config');
const CustomTwitchAlertModel = require('./models/custom-twitch-alerts');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
        )
            .then(() => {
                console.log('[DB] Database connection successful');
            })
            .catch(err => {
                console.error('[DB] Database connection error', err);
            });
    }

    async getDiscordConfig() {
        return await DiscordConfigModel.findOne({ current: true });
    }

    updateRoleAssignmentMessageConfig(id) {
        console.log(`[DB] Setting role assignment message id of current config to ${id}`);
        DiscordConfigModel.updateOne(
            { current: true },
            { roleAssignmentMessage: id }
        ).exec();
    }

    async getCustomTwitchAlerts() {
        return await CustomTwitchAlertModel.find({});
    }

    async getDiscordUsersMap() {
        const users = await UserModel.find({});
        const usersMap = new Map();

        users.forEach(user => {
            usersMap[user.username] = user.id;
        });

        return usersMap;
    }

    async getDiscordRolesMap() {
        const roles = await RoleModel.find({});
        const rolesMap = new Map();

        roles.forEach(role => {
            rolesMap[role.name] = role.id;
        });

        return rolesMap;
    }

    async getAllChannels() {
        const channelStates = await ChannelStateModel
            .find({})
            .select('username')
            .sort('username');
        return channelStates.map(channel => channel.username);
    }

    setChannelState(username, online, streamData) {
        console.log(`[DB] Setting user ${username} online state to ${online}`);
        ChannelStateModel.updateOne(
            { username },
            { online, streamData }
        ).exec();
    }

    setChannelLastPingTimestamp(username) {
        const now = new Date().getTime();
        console.log(`[DB] Setting user ${username} last ping timestamp to ${now}`);
        ChannelStateModel.updateOne(
            { username },
            { lastPing: now }
        ).exec();
    }

    async getChannelLastPingTimestamp(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select("lastPing");
        return channelState.lastPing;
    }

    setChannelLastOfflineTimestamp(username) {
        const now = new Date().getTime();
        console.log(`[DB] Setting user ${username} last set offline timestamp to ${now}`);
        ChannelStateModel.updateOne(
            { username },
            { lastSetOffline: now }
        ).exec();
    }

    async getChannelLastOfflineTimestamp(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select("lastSetOffline");
        return channelState.lastSetOffline;
    }

    async getChannelsByState(online) {
        return ChannelStateModel.find({ online });
    }

    async isChannelOnline(username) {
        const channelState = await ChannelStateModel
            .findOne({ username })
            .select('online');
        return channelState.online;
    }
}

module.exports = new Database()