import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
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
        ],
        default: "user",
    },
});

const User = mongoose.model("User", UserSchema);

export default User;