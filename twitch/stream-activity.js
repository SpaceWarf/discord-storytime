const db = require("../db/db");

class StreamActivity {
    static async getAllChannels() {
        return await db.getAllChannels();
    }

    static setChannelOnline(stream) {
        console.log('[StreamActivity] Setting channel online:', stream.user_name);
        db.setChannelState(stream.user_name.toLowerCase(), true, stream);
    }

    static setChannelLastPingTimestamp(stream) {
        console.log('[StreamActivity] Setting channel last ping:', stream.user_name);
        db.setChannelLastPingTimestamp(stream.user_name.toLowerCase());
    }

    static getChannelLastPingTimestamp(stream) {
        return db.getChannelLastPingTimestamp(stream.user_name.toLowerCase());
    }

    static setChannelOffline(stream) {
        console.log('[StreamActivity] Setting channel offline:', stream.user_name);
        db.setChannelState(stream.user_name.toLowerCase(), false, {});
    }

    static setChannelLastOfflineTimestamp(stream) {
        console.log('[StreamActivity] Setting channel last offline:', stream.user_name);
        db.setChannelLastOfflineTimestamp(stream.user_name.toLowerCase());
    }

    static getChannelLastOfflineTimestamp(stream) {
        return db.getChannelLastOfflineTimestamp(stream.user_name.toLowerCase());
    }

    static getOnlineChannels() {
        return db.getChannelsByState(true);
    }

    static isChannelOnline(stream) {
        return db.isChannelOnline(stream.user_name.toLowerCase());
    }
}

module.exports = StreamActivity;