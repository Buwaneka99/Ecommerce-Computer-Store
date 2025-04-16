import mongoose from "mongoose";
import express from "express";

const messageRouter = express.Router();

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);

messageRouter.post("/", async (req, res) => {
  try {
    const { message, to } = req.body;

    const newMessage = await Message.create({
      message,
      to,
    });

    res.status(201).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

messageRouter.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

messageRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndDelete(id);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default messageRouter;
