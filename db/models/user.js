const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    id: String
});

module.exports = mongoose.model('users', userSchema);