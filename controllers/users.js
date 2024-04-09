import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const userData = req.body;

    if (!userData.name || !userData.phone || !userData.rollNumber || !userData.password) {        
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await userModel.create(userData);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.redirect("/dashboard");
}

export const loginUser = async (req, res) => {
    const userData = req.body;

    if (!userData.rollNumber || !userData.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ rollNumber: userData.rollNumber });

    if (!user) {
        return res.status(401).json({ message: "Roll Number not found. Please Sign Up" });
    }

    if (!await bcrypt.compare(userData.password, user.password)) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.redirect("/dashboard");
}
