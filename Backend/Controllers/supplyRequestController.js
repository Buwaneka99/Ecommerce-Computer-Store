import RequestSupplier from "../Models/RequestSupplier";

export const createRequestSupplier = async (req, res) => {
  try {
    const requestSupplier = await RequestSupplier.create(req.body);
    res.status(201).json({ requestSupplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestSupplier = async (req, res) => {
  try {
    const requestSuppliers = await RequestSupplier.find();
    res.status(200).json(requestSuppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putReuestSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const requestSupplier = await RequestSupplier.findById(id,
      { status },
      { new: true }
    );


    if (!requestSupplier) {
      return res.status(404).json({ message: "Request Supplier not found" });
    }
    
    const updatedRequestSupplier = await requestSupplier.save();

    res.status(200).json({ requestSupplier: updatedRequestSupplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}