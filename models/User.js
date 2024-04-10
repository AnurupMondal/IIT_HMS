import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    rollNumber: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

user.plugin(mongooseUniqueValidator);

const userModel = model('User', user);

export default userModel;