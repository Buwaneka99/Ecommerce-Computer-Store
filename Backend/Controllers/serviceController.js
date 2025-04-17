import mongoose from "mongoose";
//import Service from "../model/Service.js";
import Service from "../Models/Service.js";

// Get all service requests (Admin use)
export const getUserServices = async (req, res) => {
  try {
    const services = await Service.find().populate("user");
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
};

// Create a new service request
export const createUserService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({ message: "Failed to create service", error: error.message });
  }
};

// Get a specific service request by ID
export const getUserService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid service ID" });

  try {
    const service = await Service.findById(id);
    if (!service)
      return res.status(404).json({ message: "Service not found" });

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

// Update a service request
export const updateUserService = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid service ID" });

  try {
    const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });

    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update service", error: error.message });
  }
};

// Delete a service request
export const deleteUserService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid service ID" });

  try {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Service not found" });

    return res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete service", error: error.message });
  }
};

// Get all services for a specific user
export const getUserServicesByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid user ID" });

  try {
    const services = await Service.find({ user: id }).populate("user");
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user services", error: error.message });
  }
};
