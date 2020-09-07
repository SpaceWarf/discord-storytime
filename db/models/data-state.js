const mongoose = require('mongoose');

var dataStateSchema = new mongoose.Schema({
    frumpkin: Boolean,
    peruname: String,
    current: Boolean
});

module.exports = mongoose.model('data-states', dataStateSchema);