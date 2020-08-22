const mongoose = require('mongoose');

var channelStateSchema = new mongoose.Schema({
    username: String,
    online: Boolean,
    streamData: JSON,
    lastPing: Date,
    lastSetOffline: Date
});

module.exports = mongoose.model('channel-states', channelStateSchema);