require('dotenv').config();
const axios = require('axios');

/**
 * Twitch Helix API helper ("New Twitch API").
 */
class TwitchApi {
    static get requestOptions() {
        // Automatically remove "oauth:" prefix if it's present
        const oauthPrefix = "oauth:";
        let oauthBearer = process.env.TWITCH_OAUTH_TOKEN;
        if (oauthBearer.startsWith(oauthPrefix)) {
            oauthBearer = oauthBearer.substr(oauthPrefix.length);
        }
        // Construct default request options
        return {
            baseURL: "https://api.twitch.tv/helix/",
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${oauthBearer}`
            }
        };
    }

    static handleApiError(err) {
        const res = err.response || {};

        if (res.data && res.data.message) {
            console.error('[TwitchApi]', 'API request failed with Helix error:', res.data.message, `(${res.data.error}/${res.data.status})`);
        } else {
            console.error('[TwitchApi]', 'API request failed with error:', err.message || err);
        }
    }

    static fetchStreams(channelNames = []) {
        return new Promise((resolve, reject) => {
            axios.get(`/streams?user_login=${channelNames.join('&user_login=')}`, this.requestOptions)
                .then((res) => {
                    resolve(res.data.data || []);
                })
                .catch((err) => {
                    this.handleApiError(err);
                    reject(err);
                });
        });
    }

    static fetchGameInfo(gameId) {
        return new Promise((resolve, reject) => {
            axios.get(`/games?id=${gameId}`, this.requestOptions)
                .then((res) => {
                    resolve(res.data.data || []);
                })
                .catch((err) => {
                    this.handleApiError(err);
                    reject(err);
                });
        });
    }

    /**
     * Take into consideration that the current Twitch API does not return tags
     * applied by game selection in their tags API routes. For example, the tag
     * 'FPS' applied by the game 'Call of Duty' will not be returned. But the
     * language tags and the manually added tags will be.
     */
    static fetchTagsInfo(tagIds = []) {
        return new Promise((resolve, reject) => {
            axios.get(`/tags/streams?tag_id=${tagIds.join("&tag_id=")}`, this.requestOptions)
                .then((res) => {
                    resolve(res.data.data || []);
                })
                .catch((err) => {
                    this.handleApiError(err);
                    reject(err);
                });
        });
    }

    static fetchUserInfo(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/users?id=${id}`, this.requestOptions)
                .then((res) => {
                    resolve(res.data.data || []);
                })
                .catch((err) => {
                    this.handleApiError(err);
                    reject(err);
                });
        });
    }
}

module.exports = TwitchApi;