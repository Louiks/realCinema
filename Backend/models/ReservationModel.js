const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
      type: String,
      required: true
  },  email: {
    type: String,
    required: true
  },
  phoneNumber: {type: Number, required: true},
    seats: [{
        type: mongoose.Schema.Types.Mixed, ref: 'Seat',
        required: true
    }],
    movie: {
        type: mongoose.Schema.Types.Mixed, ref: 'Movie',
        required: true
    },
    date: {
        type: Date,
        required: false
    },
  
  });

const Reservation = module.exports = mongoose.model("Reservation", ReservationSchema);

module.exports.addReservation = function (reservation, callback) {
    reservation.save(callback)
};

module.exports.allReservations = function (callback) {
    Reservation.find({}, callback);
}

module.exports.findReservation = function (phoneNum, callback) {
    Reservation.
        find({ phoneNumber: phoneNum }).
        populate({path:'seance', select: 'movie', populate: {path: 'movie'}}).
        populate('seats').
        exec(callback)
}