const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    name: String,
    id: String
});

module.exports = mongoose.model('messages', messageSchema);