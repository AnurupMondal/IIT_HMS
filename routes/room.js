import express from 'express';
const router = express.Router();
import { createRoom, getRooms, allotRoom } from '../controllers/room.js';

// Create a new room
router.post('/create', createRoom);

// Get all rooms
router.get('/rooms', getRooms);

// Allot a room to a student
router.post('/allot', allotRoom);

export default router;