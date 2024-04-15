const Room = require('../models/room.js');

exports.getAvailableRooms = async (req, res) => {
    const availableRooms = await Room.find({ isAvailable: true });
    res.send(availableRooms);
};

exports.allotRoom = async (req, res) => {
    const { studentName, roomPreference } = req.body;
    const room = await Room.findOne({ roomType: roomPreference, isAvailable: true });

    if (!room) {
        return res.status(404).send('No available rooms of the preferred type');
    }

    room.isAvailable = false;
    await room.save();

    const student = new Student({ name: studentName, allottedRoom: room.roomNumber });
    await student.save();

    res.send(`${studentName} has been allotted room ${room.roomNumber}`);
};
