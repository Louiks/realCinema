const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('../models/MovieModel');
const Ticket = require('../models/TickedModel')
const Hall = require('../models/HallModel');
const express = require('express');
const router = express.Router();
const Seat = require('../models/SeatModel')

router.post('/remove', (req, res) => {
    Ticket.findByIdAndDelete(req.body.id, (err, deleted) => {
        if (err) {
            res.json({
                msg: "err " + err
            })
        } else {
            res.json({
                success: true,
                deleted: deleted
            })
        }
    })
})

router.post('/add', (req, res) => {

    let newSeats = [];
    console.log(req.body);
    
    for (let d = 0; d < req.body.dates.length; d++) {
        for (let i = 1; i <= req.body.hall.rows; i++) {
            for (let j = 1; j <= req.body.hall.columns; j++) {
                newSeats.push(new Seat({ date: req.body.dates[d], row: i, column: j }));
            }
        }
    }
    const newTicket = new Ticket({
        dates: req.body.dates,
        movie: req.body.movie.id,
        hall: req.body.hall.id,
        seats: newSeats
    });
    Ticket.addTicket(newSeance, (err, seance) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while adding new seance: " + err,
            });
        } else {
            Seat.addMany(newSeats, (e, seats) => {
                if (e) {
                    res.json({
                        success: false,
                        message: "An error occured while adding seats: " + e,
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Added new seance",
                        seance: seance,
                        seats: seats
                    });
                }
            })
        }
    });

});

router.delete('/remove', (req, res) => {
    Ticket.removeTickets(req.body.seances, (err) => {
        if (err) {
            res.json({
                message: "error: " + err,
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: "All seances removed"
            });
        };
    });
});

router.put('/update', (req, res) => {
    let query = { 'tickets._id': req.body.id }
    Ticket.findOneAndUpdate(query, { $set: { "tickets.&.seats._id": req.body.seatId } }, (err, doc, ress) => {
        if (err) {
            res.json({
                message: "error: " + err,
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: doc, ress
            });
        }
    })
});

router.get('/all', (req, res) => {
    Ticket.find({}, (err, tickets) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while adding new seance",
            })
        } else {
            res.json({
                success: true,
                message: "Seances fetched",
                tickets: tickets
            })
        }
    })
})

module.exports = router;