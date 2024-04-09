import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("The Database has been Connected Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}