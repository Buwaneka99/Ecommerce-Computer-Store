import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
//import { Server } from "socket.io";

// Google Auth
import { OAuth2Client } from "google-auth-library";
import passport from "./Config/passport.js";
import session from "express-session";

// Import Routes
import userRoute from "./Routes/UserRoute.js";
import supplyRoute from "./Routes/supplyRoute.js";
//import supplyRequestRoute from "./Routes/supplyRequestRoute.js";
//import supplierRoute from "./Routes/supplierRoute.js";
import productRoute from "./Routes/productRouter.js";


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
        process.exit(1);
    });

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔑 Google Auth callback URL: ${process.env.GOOGLE_CALLBACK_URL}`);
});

// Middleware for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/dashboard', failureRedirect: '/login' }));

// Check if user is logged in (for API calls)
app.get('/api/user', (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ error: "Not logged in" });
});

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});


//API Routes
app.use("/auth", userRoute);
app.use("/supplies", supplyRoute);
app.use("/products", productRoute);

