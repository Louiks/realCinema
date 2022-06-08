const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('./MovieModel');
const Hall = require("./HallModel");

const TicketSchema = mongoose.Schema({
    datesOfFilm: {
        type: [Date],
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie',
        required: true
    },
    seats: [
        {
            type: mongoose.Schema.Types.Mixed, ref: 'Seat',
            required: true
        }
    ],
    hall: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hall',
        required:  true
    },
  });
const Ticket = module.exports = mongoose.model("Ticket", TicketSchema);

module.exports.addTicket = function(ticket, callback)
{
    ticket.save(callback);
};

module.exports.removeTicket = function(id, callback)
{
    Ticket.findByIdAndRemove(id, callback);
};

module.exports.removeTickets = function(id, callback)
{
    Ticket.deleteMany({id: {$in: id}}, callback);

};

