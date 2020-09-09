const mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
    name: String,
    id: String
});

module.exports = mongoose.model('channels', channelSchema);