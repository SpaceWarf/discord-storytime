const mongoose = require('mongoose');
const ChannelStateModel = require('./models/channel-state');

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`
        )
            .then(() => {
                console.log('[DB] Database connection successful');
            })
            .catch(err => {
                console.error('[DB] Database connection error', err);
            });
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