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

// Function to retrieve all complaints
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({});  // You can add query filters here if needed

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints', error });
    }
};

// Function to update a specific complaint
export const updateComplaint = async (req, res) => {
    const { complaintId } = req.params;
    const { resolved } = req.body;

    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.resolved = resolved;
        await complaint.save();

        res.status(200).json({ message: 'Complaint updated successfully', complaint });
    } catch (error) {
        res.status(400).json({ message: 'Error updating complaint', error });
    }
};