const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    id: String,
    nitro: Boolean
});

module.exports = mongoose.model('users', userSchema);