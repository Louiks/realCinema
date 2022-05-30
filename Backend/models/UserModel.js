const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);