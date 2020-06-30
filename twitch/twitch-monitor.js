const { usernames, pollingInterval } = require('../config/twitch.config.js');
const TwitchApi = require('./twitch-api');

class TwitchMonitor {
    static start() {
        setInterval(() => {
            this.refresh();
        }, pollingInterval);

        // Immediate refresh after startup (allow voice etc to settle)
        setTimeout(() => {
            this.refresh();
        }, 1000);

        // Ready!
        console.log('[TwitchMonitor]', `Configured stream status polling for channels:`, usernames, `(${pollingInterval}ms interval)`);
    }

    static refresh() {
        console.warn('[TwitchMonitor]', 'Polling channels.');
        // Check buffer: are we waiting?
        if (this.eventBufferStartTime) {
            let now = Date.now();
            let timeSinceMs = now - this.eventBufferStartTime;

            if (timeSinceMs >= TwitchMonitor.EVENT_BUFFER_MS) {
                // Buffer is done
                this.eventBufferStartTime = null;
            } else {
                // We're in the buffer zone, do nothing
                return;
            }
        }

        TwitchApi.fetchStreams(usernames)
            .then((channels) => {
                this.handleStreamList(channels);
            })
            .catch((err) => {
                console.warn('[TwitchMonitor]', 'Error in stream refresh:', err);
            });
    }

    static handleStreamList(streams) {
        // Index channel data & build list of stream IDs now online
        let nextOnlineList = [];

        streams.forEach((stream) => {
            const channelName = stream.user_name.toLowerCase();

            if (stream.type === "live") {
                nextOnlineList.push(channelName);
            }

            let prevStreamData = this.streamData[channelName] || {};
            this.streamData[channelName] = Object.assign({}, prevStreamData, stream);
        });

        // Find channels that are now online, but were not before
        let notifyFailed = false;
        let anyChanges = false;

        for (let i = 0; i < nextOnlineList.length; i++) {
            let _chanName = nextOnlineList[i];

            if (this.activeStreams.indexOf(_chanName) === -1) {
                // Stream was not in the list before
                console.log('[TwitchMonitor]', 'Stream channel has gone online:', _chanName);
                anyChanges = true;
            }

            if (!this.handleChannelLiveUpdate(this.streamData[_chanName], true)) {
                notifyFailed = true;
            }
        }

        // Find channels that are now offline, but were online before
        for (let i = 0; i < this.activeStreams.length; i++) {
            let _chanName = this.activeStreams[i];

            if (nextOnlineList.indexOf(_chanName) === -1) {
                // Stream was in the list before, but no longer
                console.log('[TwitchMonitor]', 'Stream channel has gone offline:', _chanName);
                this.handleChannelOffline(this.streamData[_chanName]);
                anyChanges = true;
            }
        }

        if (!notifyFailed) {
            // Notify OK, update list
            this.activeStreams = nextOnlineList;

            if (anyChanges) {
                // Twitch has a weird caching problem where channels seem to quickly alternate between on<->off<->on<->off
                // To avoid spamming, we'll create a buffer time-out whenever this happens
                // During the buffer time (see EVENT_BUFFER_MS) no Twitch API requests will be made
                this.eventBufferStartTime = Date.now();
            }
        } else {
            console.log('[TwitchMonitor]', 'Could not notify channel, will try again next update.');
        }
    }

    static handleChannelLiveUpdate(streamData, isOnline) {
        for (let i = 0; i < this.channelLiveCallbacks.length; i++) {
            let _callback = this.channelLiveCallbacks[i];

            if (_callback) {
                if (_callback(streamData, isOnline) === false) {
                    return false;
                }
            }
        }

        return true;
    }

    static handleChannelOffline(streamData) {
        this.handleChannelLiveUpdate(streamData, false);

        for (let i = 0; i < this.channelOfflineCallbacks.length; i++) {
            let _callback = this.channelOfflineCallbacks[i];

            if (_callback) {
                if (_callback(streamData) === false) {
                    return false;
                }
            }
        }

        return true;
    }

    static onChannelLiveUpdate(callback) {
        this.channelLiveCallbacks.push(callback);
    }

    static onChannelOffline(callback) {
        this.channelOfflineCallbacks.push(callback);
    }
}

TwitchMonitor.eventBufferStartTime = 0;
TwitchMonitor.activeStreams = [];
TwitchMonitor.streamData = {};

TwitchMonitor.channelLiveCallbacks = [];
TwitchMonitor.channelOfflineCallbacks = [];

TwitchMonitor.EVENT_BUFFER_MS = 2 * 60 * 1000;

module.exports = TwitchMonitor;