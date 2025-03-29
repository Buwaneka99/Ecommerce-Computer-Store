import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
//import { Server } from "socket.io";

// Import Routes
import userRoute from "./Routes/UserRoute.js";
import supplyRoute from "./Routes/supplyRoute.js";
//import supplyRequestRoute from "./Routes/supplyRequestRoute.js";
//import supplierRoute from "./Routes/supplierRoute.js";
import productRoute from "./Routes/productRouter.js";
import orderRoute from "./Routes/orderRouter.js";


dotenv.config();
const app = express();
const server = createServer(app);

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
app.use("/supplies", supplyRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
