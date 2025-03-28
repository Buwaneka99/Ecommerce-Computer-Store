import express from "express";

import {
  createSupplier,
  getSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../Controllers/SupplierController.js";


const supplyRouter = express.Router();

supplyRouter
  .route("/")
  .get(getSupplier)
  .post(createSupplier);
  
supplyRouter
  .route("/:id")
  .get(getSupplierById)
  .put(updateSupplier)
  .delete(deleteSupplier);

export default supplyRouter;
