import express from 'express';
import { submitComplaint } from '../controllers/complaint.js';

const router = express.Router();

router.post('/create', submitComplaint);

export default router;
