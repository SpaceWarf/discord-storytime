const mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    name: String,
    id: String
});

module.exports = mongoose.model('roles', roleSchema);