import Supplier from "../Models/Supplier.js";
import RequestSupplier from "../Models/RequestSupplier.js";

export const createSupplier = async (req, res) => {
  try{

    const supplier = await Supplier.create(req.body);
    res.status(201).json({ supplier });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const getSupplier = async (req, res) => {
  try{
    const suppliers = await Supplier.find();
    res.status(200).json({ suppliers });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try{
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if(!supplier){
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try{
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    
    if(!supplier){
      return res.status(404).json({ message: "Supplier not found" });
    }

    Object.keys(req.body).forEach((key) => {
      supplier[key] = req.body[key];
    });

    const updatedSupplier = await supplier.save();

    res.status(200).json({ supplier: updatedSupplier });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try{
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndDelete(id);

    if(!supplier){
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const createSupplierRequest = async (req, res) => {
  try{
    const requestSupplier = await RequestSupplier.create(req.body);

    res.status(201).json({ requestSupplier });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const getSupplierRequest = async (req, res) => {
  try{
    const requestSuppliers = await RequestSupplier.find();

    res.status(200).json(requestSuppliers);
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const getSupplierRequestById = async (req, res) => {
  try{
    const { id } = req.params;
    const requestSupplier = await RequestSupplier.findById(id);

    if(!requestSupplier){
      return res.status(404).json({ message: "Request Supplier not found" });
    }

    res.status(200).json(requestSupplier);
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};

export const updateSupplierRequest = async (req, res) => {
  try{
    const { id } = req.params;
    const requestSupplier = await RequestSupplier.findById(id);

    if(!requestSupplier){
      return res.status(404).json({ message: "Request Supplier not found" });
    }

    Object.keys(req.body).forEach((key) => {
      requestSupplier[key] = req.body[key];
    });

    const updatedSupplierRequest = await requestSupplier.save();

    res.status(200).json({ requestSupplier: updatedSupplierRequest });

    res.status(200).json({ message: "Supplier updated successfully" });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
};