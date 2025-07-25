import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin",
            "inventory",
            "sales",
            "suppliers",
            "promotion",
            "feedback",
            "service",
            "delivery",
        ],
        default: "user",
    },
    googleId: {
        type: String,
    },
    token: {
        type: String,
    },
    coupon: {
        code: { type: String },
        discount: { type: Number },
        isActive: { type: Boolean, default: false },
        issuedAt: { type: Date },
    },
});

const User = mongoose.model("User", UserSchema);

export default User;