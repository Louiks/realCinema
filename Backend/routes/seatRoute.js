const config = require('../config/database');
const express = require('express');
const router = express.Router();
const Seat = require('../models/SeatModel');
const mongoose = require('mongoose');
const Reservation = require('../models/ReservationModel');

router.post('/reserve', (req, res) => {

    Seat.reserveSeat({ seats: req.body.seats }, (err, done) => {
        if (err) {
            res.json({
                msg: "Failed to reserve seats " + err,
                success: false,
            });
        } else {
            let reservation = new Reservation({
                firstName: req.body.personInfo.firstName,
                lastName: req.body.personInfo.lastName,
                phoneNumber: req.body.personInfo.phoneNumber,
                email: req.body.personInfo.email,
                seats: req.body.seats,
                ticket: req.body.ticket
            })
            Reservation.addReservation(reservation, (err2, reserv) => {
                if (err) {
                    res.json({
                        msg: "Failed to reserve seats " + err2,
                        success: false,
                    });
                } else {
                    res.json({
                        msg: "Reservation has done: ",
                        success: true,
                        reservation: reserv,
                        updatedSeats: done
                    });
                }
            })
        }
    });
});

router.post('/getseats', (req, res) => {

    Seat.find({ _id: { $in: req.body.seats } }, (err, seats) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats: " + err,
            })
        } else {
            res.json({
                success: true,
                message: "Seats fetched",
                seats: seats
            })
        }
    })
})

router.get('/all', (req, res) => {
    Seat.find({}, (err, seats) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats",
            })
        } else {
            res.json({
                success: true,
                message: "Seats fetched",
                seats: seats
            })
        }
    })
})

module.exports = router;