const mongoose = require('mongoose');

const HallSchema = mongoose.Schema({
    NumberOfHall: {
        type: Number,
        required: true,
        unique: true
    },
    NumberOfColumns: {
        type: Number,
        required: true
    },
    NmberOfRows: {
        type: Number,
        required: true
    },
  });

const Hall = module.exports = mongoose.model("Hall", HallSchema);

module.exports.getHall = function(id, callback)
{
    Hall.findById(id, callback);
};

module.exports.addHall = function(hall, callback)
{
    hall.save(callback);
};


module.exports.removeHall = function(id, callback)
{
    Hall.findByIdAndDelete(id, callback);
};

module.exports.getHalls = function(callback)
{
    Hall.find({}, callback);
};

