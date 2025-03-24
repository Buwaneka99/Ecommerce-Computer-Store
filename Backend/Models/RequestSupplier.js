import mongoose from "mongoose";

const requestSupplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  supplyProduct: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const RequestSupplier = mongoose.model(
  "RequestSupplier",
  requestSupplierSchema
);

export default RequestSupplier;
