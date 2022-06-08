const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    googleId : { type: String},
    email: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    password: {type: String},
    phoneNumber: {type: Number},
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);