import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    productID: {
        type: String,
    },
    productName: {
        type: String,
    },
    productPurchasedDate: {
        type: Date,
    },
    productWarrabtyPeriod: {
        type: Number,
    },
    claimDescription: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "Pending",
    },
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;