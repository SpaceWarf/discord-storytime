const db = require("../db/db");

class StreamActivity {
    static async getAllChannels() {
        const channelStates = await db.getAllChannelStates();
        return channelStates.map(channel => channel.username);
    }

    static setChannelOnline(stream) {
        db.setChannelOnlineState(stream.user_name.toLowerCase(), true, stream);
    }

    static setChannelLastPingTimestamp(stream) {
        db.setChannelLastPingTimestamp(stream.user_name.toLowerCase());
    }

    static getChannelLastPingTimestamp(stream) {
        const channelState = db.getChannelState(stream.user_name.toLowerCase());
        return channelState.lastPing;
    }

    static setChannelOffline(stream) {
        db.setChannelOnlineState(stream.user_name.toLowerCase(), false, {});
    }

    static setChannelLastOfflineTimestamp(stream) {
        db.setChannelLastOfflineTimestamp(stream.user_name.toLowerCase());
    }

    static getChannelLastOfflineTimestamp(stream) {
        const channelState = db.getChannelState(stream.user_name.toLowerCase());
        return channelState.lastSetOffline;
    }

    static getOnlineChannels() {
        return db.getChannelsByOnlineState(true);
    }

    static isChannelOnline(stream) {
        const channelState = db.getChannelState(stream.user_name.toLowerCase());
        return channelState.online;
    }
}

module.exports = StreamActivity;