const ChannelStateModel = require('./models/channel-state');
const DiscordConfigModel = require('./models/discord-config');
const CustomTwitchAlertModel = require('./models/custom-twitch-alerts');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');
const ChannelModel = require('./models/channel');
const MessageModel = require('./models/message');
const DataStateModel = require('./models/data-state');

class Database {
    static async getDataState() {
        return await DataStateModel.findOne({ current: true });
    }

    static updateFrumpkinState(frumpkin) {
        console.log(`[DB] Setting frumpkin state to ${frumpkin}`);
        DataStateModel.updateOne(
            { current: true },
            { frumpkin }
        ).exec();
    }

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
        const usersMap = new Map();

        (await UserModel.find({})).forEach(user => {
            usersMap[user.username] = user.id;
        });

        return usersMap;
    }

    static async getDiscordRolesMap() {
        const rolesMap = new Map();

        (await RoleModel.find({})).forEach(role => {
            rolesMap[role.name] = role.id;
        });

        return rolesMap;
    }

    static async getDiscordChannelsMap() {
        const channelsMap = new Map();

        (await ChannelModel.find({})).forEach(channel => {
            channelsMap[channel.name] = channel.id;
        });

        return channelsMap;
    }

    static async getDiscordMessagesMap() {
        const messagesMap = new Map();

        (await MessageModel.find({})).forEach(message => {
            messagesMap[message.name] = message.id;
        });

        return messagesMap;
    }

    static async getDiscordUser(id) {
        return await UserModel.findOne({ id });
    }

    static async getAllChannelStates() {
        return await ChannelStateModel
            .find({})
            .sort([["order", 1], ["username", 1]]);
    }

    static async getChannelState(username) {
        return await ChannelStateModel.findOne({ username });
    }

    static async getChannelsByOnlineState(online) {
        return await ChannelStateModel.find({ online });
    }

    static setChannelOnlineState(username, online, streamData) {
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

    static setChannelLastOfflineTimestamp(username) {
        const now = new Date().getTime();
        console.log(`[DB] Setting user ${username} last set offline timestamp to ${now}`);
        ChannelStateModel.updateOne(
            { username },
            { lastSetOffline: now }
        ).exec();
    }

    static setPeruname(username) {
        console.log(`[DB] Setting username for Peruman to ${username}`);
        DataStateModel.updateOne(
            { current: true },
            { peruname: username }
        ).exec();
    }

    static async getUserAttributes(id) {
        const user = await UserModel.findOne({ id });
        return user.attributes;
    }
}

module.exports = Database;