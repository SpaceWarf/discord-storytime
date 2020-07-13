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

const alertChannel = "bot-channel-🤖";

const customAlerts = {
    "space_warf": "@everyone The rat bastard himself has just gone live!\nhttp://www.twitch.tv/%u% - %t%",
    "default": "@everyone %u% just went live\nhttp://www.twitch.tv/%u% - %t%"
};

module.exports = {
    usernames,
    pollingInterval,
    alertChannel,
    customAlerts
};
