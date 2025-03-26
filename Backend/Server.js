import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import { createServer } from "http";
//import { Server } from "socket.io";

// Import Routes
import userRoute from "./Routes/UserRoute.js";

dotenv.config();
const app = express();
const server = createServer(app);

// Connect to MongoDB
//connectMongoDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const URL = process.env.MONGO_URI;
mongoose.connect(URL)
    .then(() => {
        console.log("✅ MongoDB database connection established successfully");
    })
    .catch((error) => {
        console.error("❌ Connection error:", error);
    });

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});



//API Routes
app.use("/auth", userRoute);
