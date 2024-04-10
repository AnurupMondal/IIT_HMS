import userModel from '../models/User.js';
import Complaint from '../models/complaint.js';

export const submitComplaint = async (req, res) => {
    try {
        const { rollNumber, complaintType, complaintText } = req.body;

        console.log(rollNumber, complaintType, complaintText);

        const user = await userModel.findOne({ rollNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newComplaint = new Complaint({
            rollNumber: user.rollNumber,
            complaintType,
            complaintText,
        });

        await newComplaint.save();

        res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting complaint', error });
    }
};
