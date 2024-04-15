const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: String,
    roomType: String,
    isAvailable: { type: Boolean, default: true }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

