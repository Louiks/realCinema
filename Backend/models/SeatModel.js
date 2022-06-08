const mongoose = require('mongoose');
const config = require('../config/database');

const SeatSchema = mongoose.Schema({
    row: {
        type: String,
        required: true
    },
    column: {
        type: String,
        required: true
    },
    isReserved: {
        type: Boolean,
        default: false
    },
  });

const Seat = module.exports = mongoose.model("Seat", SeatSchema);

module.exports.reserveSeat = function({seats, person}, callback)
{
    Seat.updateMany({_id: {$in: seats}}, {isReserved: true, person: person}, callback);

};

module.exports.addSeats = function(seats, callback)
{
    Seat.insertMany(seats, callback);
};
  