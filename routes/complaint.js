import express from 'express';
import { getAllComplaints, submitComplaint, updateComplaint } from '../controllers/complaint.js';

const router = express.Router();

router.post('/create', submitComplaint);
router.get('/complaints', getAllComplaints);
router.put('/api/complaints/:complaintId', updateComplaint);

export default router;
