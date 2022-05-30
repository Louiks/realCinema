const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const database = {};
database.mongoose = mongoose;
database.user = require('./UserModel');
database.role = require('./RoleModel');
database.ROLES = ['user', 'admin'];
module.exports = database;