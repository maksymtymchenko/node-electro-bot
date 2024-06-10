import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userIp: {
        type: String,
        required: true,
        unique: true
    },
});

export default mongoose.model('UserSchema', UserSchema)
