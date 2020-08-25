const TwitchApi = require('./twitch-api');

class CustomEmbed {
    static async getCustomAlertMessage(customTwitchAlerts, streamData, roleToPing) {
        const customAlertData = this.getAlertMessageForUsername(customTwitchAlerts, streamData.user_name.toLowerCase());
        let customMessage = this.populateAlertVariables(customAlertData.message, streamData, roleToPing)

        let streamThumbnailUrl = streamData.thumbnail_url;
        streamThumbnailUrl = streamThumbnailUrl.replace("{width}", "1280");
        streamThumbnailUrl = streamThumbnailUrl.replace("{height}", "720");

        const gameInfo = await TwitchApi.fetchGameInfo(streamData.game_id);
        const tagsInfo = streamData.tag_ids
            ? await TwitchApi.fetchTagsInfo(streamData.tag_ids)
            : [];
        const channelInfo = await TwitchApi.fetchUserInfo(streamData.user_id);
        return {
            "content": customMessage,
            "embed": {
                "title": streamData.title,
                "url": `http://www.twitch.tv/${streamData.user_name}`,
                "color": customAlertData.color,
                "thumbnail": {
                    "url": channelInfo[0].profile_image_url
                },
                "image": {
                    "url": streamThumbnailUrl
                },
                "author": {
                    "name": streamData.user_name,
                    "url": `http://www.twitch.tv/${streamData.user_name}`,
                    "icon_url": channelInfo[0].profile_image_url
                },
                "fields": this.getFormattedFields(gameInfo, tagsInfo)
            }
        };
    }

    static getAlertMessageForUsername(alertMessages, username) {
        const messageForUsername = alertMessages.find(alert => alert.username === username);

        return messageForUsername
            ? messageForUsername
            : alertMessages.find(alert => alert.username === "default");
    }

    static populateAlertVariables(message, streamData, roleToPing) {
        let populatedMessage = message;
        populatedMessage = populatedMessage.replace(/%ue%/g, this.escapeFormatChars(streamData.user_name));
        populatedMessage = populatedMessage.replace(/%u%/g, streamData.user_name);
        populatedMessage = populatedMessage.replace(/%t%/g, streamData.title);
        populatedMessage = populatedMessage.replace(/%r%/g, roleToPing);

        return populatedMessage;
    }

    static escapeFormatChars(string) {
        const charsToEscape = ["_", "*", "~"];
        return string
            .split("")
            .map(char => charsToEscape.includes(char) ? `\\${char}` : char)
            .join("");
    }

    static getFormattedFields(gameInfo, tagsInfo) {
        const fields = [];
        if (gameInfo.length > 0) {
            fields.push({
                "name": "Game",
                "value": gameInfo[0].name,
                inline: true
            })
        }

        if (tagsInfo.length > 0) {
            const tagsArray = tagsInfo
                .reduce((array, tag) => {
                    array.push(tag.localization_names["en-us"]);
                    return array;
                }, []);
            fields.push({
                "name": "Tags",
                "value": tagsArray.join(", "),
                inline: true
            });
        }

        return fields;
    }
}

module.exports = CustomEmbed;