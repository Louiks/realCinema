const express = require('express');
const router = express.Router();
const Reservation = require('../models/ReservationModel');


router.post('/get', (req, res) => {

    Reservation.findReservation(req.body.phoneNumber, (err, reserv) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats",
            })
        } else {
            res.json({
                success: true,
                message: "Reservation fetched",
                reservation: reserv
            })
        }
    })
})
router.get('/all', (req, res) => {
    Reservation.find({}, (err, seats) => {
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
