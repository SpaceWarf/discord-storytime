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

    static async getChannelLastPingTimestamp(stream) {
        const channelState = await db.getChannelState(stream.user_name.toLowerCase());
        return channelState.lastPing;
    }

    static setChannelOffline(stream) {
        db.setChannelOnlineState(stream.user_name.toLowerCase(), false, {});
    }

    static setChannelLastOfflineTimestamp(stream) {
        db.setChannelLastOfflineTimestamp(stream.user_name.toLowerCase());
    }

    static async getChannelLastOfflineTimestamp(stream) {
        const channelState = await db.getChannelState(stream.user_name.toLowerCase());
        return channelState.lastSetOffline;
    }

    static async getOnlineChannels() {
        return await db.getChannelsByOnlineState(true);
    }

    static async isChannelOnline(stream) {
        const channelState = await db.getChannelState(stream.user_name.toLowerCase());
        return channelState.online;
    }
}

module.exports = StreamActivity;