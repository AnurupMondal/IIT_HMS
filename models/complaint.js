import { Schema, model } from 'mongoose';

const complaintSchema = new Schema({
    rollNumber: { 
        type: String,
        required: true,
    },
    complaintType: {
        type: String,
        required: true,
        enum: ['plumbing', 'electricity', 'food', 'carpentry'],
    },
    complaintText: {
        type: String,
        required: true,
    },
});

const Complaint = model('Complaint', complaintSchema);

export default Complaint;