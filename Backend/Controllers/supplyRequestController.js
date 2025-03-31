import RequestSupplier from "../Models/RequestSupplier.js";

export const createRequestSupplier = async (req, res) => {
  try {
    const supplier = await RequestSupplier.create(req.body);
    res.status(201).json({ supplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestSupplier = async (req, res) => {
  try {
    const suppliers = await RequestSupplier.find();
    res.status(200).json({ suppliers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putRequestSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const supplier = await RequestSupplier.findById(id,
      { status },
      { new: true }
    );


    if (!supplier) {
      return res.status(404).json({ message: "Request Supplier not found" });
    }

    res.status(200).json({ supplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};