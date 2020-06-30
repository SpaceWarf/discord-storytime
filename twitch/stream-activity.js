class StreamActivity {
    static init() {
        this.onlineChannels = {};
    }

    /**
     * Registers a channel that has come online, and updates the user activity.
     */
    static setChannelOnline(stream) {
        console.log('[StreamActivity] Setting channel online: ', stream.user_name);
        this.onlineChannels[stream.user_name] = stream;
    }

    /**
     * Marks a channel has having gone offline, and updates the user activity if needed.
     */
    static setChannelOffline(stream) {
        console.log('[StreamActivity] Setting channel offline: ', stream.user_name);
        delete this.onlineChannels[stream.user_name];
    }

    /**
     * Fetches the channels that are currently online.
     */
    static getOnlineChannels() {
        return this.onlineChannels;
    }

    /**
     * Checks if a channel is currently online.
     */
    static isChannelOnline(stream) {
        return !!this.onlineChannels[stream.user_name];
    }
}

module.exports = StreamActivity;