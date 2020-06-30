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
];

const pollingInterval = 90000;

const alertChannel = "bot-channel-🤖";

const customAlerts = {
    "space_warf": "@everyone The rat bastard himself has just gone live!\nhttp://www.twitch.tv/%u% - %t%",
    "default": "@everyone %u% just went live at http://www.twitch.tv/%u% - %t%"
};

module.exports = {
    usernames,
    pollingInterval,
    alertChannel,
    customAlerts
};
