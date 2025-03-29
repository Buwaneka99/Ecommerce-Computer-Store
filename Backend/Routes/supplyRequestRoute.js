import express from "express";
import { getRequestSupplier, putRequestSupplier, createRequestSupplier } from "../Controllers/supplyRequestController.js";

const supplyRequestRouter = express.Router();

supplyRequestRouter.route("/").get(getRequestSupplier).post(createRequestSupplier);
supplyRequestRouter.route("/:id").put(putRequestSupplier);

export default supplyRequestRouter;