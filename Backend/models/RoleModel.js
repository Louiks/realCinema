const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    type: {type: String}
});

module.exports = mongoose.model('Role', roleSchema);
