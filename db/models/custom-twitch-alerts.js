const mongoose = require('mongoose');

var customTwitchAlertSchema = new mongoose.Schema({
    username: String,
    message: String,
    color: Number
});

module.exports = mongoose.model('custom-twitch-alerts', customTwitchAlertSchema);