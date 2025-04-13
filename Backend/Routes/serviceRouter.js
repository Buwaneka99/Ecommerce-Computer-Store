import express from "express";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getUserServices,
  getUserServicesByUser,
  updateUserService,
} from "../Controllers/serviceController.js";

const serviceRouter = express.Router();

// Get all services (for admin or manager)
serviceRouter.get("/", getUserServices);

// Create a new service request (user)
serviceRouter.post("/", createUserService);

// Get a single service by ID
serviceRouter.get("/:id", getUserService);

// Update a service (status or info)
serviceRouter.put("/:id", updateUserService);

// Delete a service by ID
serviceRouter.delete("/:id", deleteUserService);

// Get all services submitted by a specific user
serviceRouter.get("/get-user-service/:id", getUserServicesByUser);

export default serviceRouter;
