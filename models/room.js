import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export const room = new Schema({
    roomNumber: {
        type: String,
        unique: true // Ensure room numbers are unique
      },
      roomType: {
        type: String,
        enum: ['single', 'shared'],
        required: true
      },
      roomCapacity: {
        type: Number,
        default: 0
      },
      students: [String],
      currentOccupancy: {
        type: Number,
        default: 0
      }
});

room.pre('save', function(next) {
    if (this.roomType === 'single') {
      this.roomCapacity = 1;
    } else if (this.roomType === 'shared') {
      this.roomCapacity = 2;
    }
    next();
  });

room.plugin(mongooseUniqueValidator);

const userRoom = model('Room', room);

export default userRoom;

