const TwitchApi = require('./twitch-api');
const { customAlerts } = require('../config/twitch.config');

class CustomEmbed {
    static async getCustomAlertMessage(streamData) {
        const customAlertData = customAlerts[streamData.user_name.toLowerCase()] || customAlerts.default;

        let customMessage = customAlertData.message;
        customMessage = customMessage.replace(/%u%/g, streamData.user_name);
        customMessage = customMessage.replace(/%t%/g, streamData.title);

        let streamThumbnailUrl = streamData.thumbnail_url;
        streamThumbnailUrl = streamThumbnailUrl.replace("{width}", "1280");
        streamThumbnailUrl = streamThumbnailUrl.replace("{height}", "720");

        const gameInfo = await TwitchApi.fetchGameInfo(streamData.game_id);
        const tagsInfo = await TwitchApi.fetchTagsInfo(streamData.tag_ids ? streamData.tag_ids : []);
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