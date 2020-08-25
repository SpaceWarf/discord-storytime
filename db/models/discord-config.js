const mongoose = require('mongoose');

var discordConfigSchema = new mongoose.Schema({
    roleAssignmentChannel: String,
    roleAssignmentMessage: String,
    alertChannel: String,
    roleToPing: String,
    pingInterval: Number,
    offlineInterval: Number,
    pingOnStartup: Boolean,
    commandPrefix: String,
    current: Boolean
});

module.exports = mongoose.model('discord-configs', discordConfigSchema);