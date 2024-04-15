const express = require('express');
const router = express.Router();
const Room = require('../models/room.js');
const Student = require('../models/Student');

router.post('/allot', async (req, res) => {
    const { name, roomPreference } = req.body;
    const room = await Room.findOne({ roomType: roomPreference, isAvailable: true });

    if (!room) {
        return res.status(404).send('No available rooms of the preferred type');
    }

    room.isAvailable = false;
    await room.save();

    const student = new Student({ name, allottedRoom: room.roomNumber });
    await student.save();

    res.send(`${name} has been allotted room ${room.roomNumber}`);
});

module.exports = router;