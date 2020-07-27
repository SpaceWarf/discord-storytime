const usernames = [
    "kittycatfriends",
    "space_warf",
    "ravxnoak",
    "seajunior",
    "hahaitscel",
    "digitalcafe",
    "megimedia",
    "peruman95",
    "ossymoon",
    "phant0mpup"
];

const pollingInterval = 60000;

// const alertChannel = "bot-channel-🤖";
const alertChannel = "the-lab";

/**
 * Color code reference can be found here:
 * https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
 */
const colors = {
    DEFAULT: 0,
    AQUA: 1752220,
    GREEN: 3066993,
    BLUE: 3447003,
    PURPLE: 10181046,
    GOLD: 15844367,
    ORANGE: 15105570,
    RED: 15158332,
    GREY: 9807270,
    DARKER_GREY: 8359053,
    NAVY: 3426654,
    DARK_AQUA: 1146986,
    DARK_GREEN: 2067276,
    DARK_BLUE: 2123412,
    DARK_PURPLE: 7419530,
    DARK_GOLD: 12745742,
    DARK_ORANGE: 11027200,
    DARK_RED: 10038562,
    DARK_GREY: 9936031,
    LIGHT_GREY: 12370112,
    DARK_NAVY: 2899536,
    LUMINOUS_VIVID_PINK: 16580705,
    DARK_VIVID_PINK: 12320855
};

const defaultMessage = "@everyone %u% just went live! http://www.twitch.tv/%u%";

const customAlerts = {
    "space_warf": {
        message: "@everyone The rat bastard himself just went live! :rat: http://www.twitch.tv/%u%",
        color: colors.RED
    },
    "seajunior": {
        message: defaultMessage,
        color: colors.AQUA
    },
    "peruman95": {
        message: defaultMessage,
        color: colors.RED
    },
    "default": {
        message: defaultMessage,
        color: colors.BLUE
    }
};

module.exports = {
    usernames,
    pollingInterval,
    alertChannel,
    customAlerts
};
