import userRoom from '../models/room.js';
import Student from '../models/User.js';

export const createRoom = async (req, res) => {
  const { roomNumber, roomType } = req.body;

  try {
    const room = new userRoom({ roomNumber, roomType });
    await room.save();
    res.send(room);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await userRoom.find();
    res.send(rooms);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const allotRoom = async (req, res) => {
  const { studentName, roomPreference } = req.body;

  try {
    const room = await userRoom.findOne({
      roomType: roomPreference,
      currentOccupancy: { $lt: function() { return this.roomType === 'single' ? 1 : 2; } }
    });

    if (!room) {
      return res.status(404).send('No available rooms of the preferred type');
    }

    room.students.push(studentName);
    room.currentOccupancy = room.students.length;
    await room.save();

    const student = new Student({ name: studentName, allottedRoom: room.roomNumber });
    await student.save();

    res.send(`${studentName} has been allotted room ${room.roomNumber}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
};