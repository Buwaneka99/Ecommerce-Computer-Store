import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productID: {
      type: String,
      required: [true, "Product ID is required"],
      trim: true,
    },
    productPurchasedDate: {
      type: Date,
      required: [true, "Purchase date is required"],
    },
    productWarrantyPeriod: {
      type: String,
      required: [true, "Warranty period is required"],
      trim: true,
    },
    claimDescription: {
      type: String,
      required: [true, "Claim description is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Done", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
