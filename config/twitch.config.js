const usernames = [
    "space_warf",
    "ravxnoak",
    "seajunior",
    "hahaitscel",
    "digitalcafe",
    "peruman95",
    "ossymoon"
];

const pollingInterval = 90000;

const alertChannel = "the-lab";

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
