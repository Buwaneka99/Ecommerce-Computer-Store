import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import session from "express-session";
import passport from "./Config/passport.js"; // your Google passport strategy

// Google Auth
import { OAuth2Client } from "google-auth-library";

// Import Routes
import userRoute from "./Routes/UserRoute.js";
import supplyRoute from "./Routes/supplyRoute.js";
import supplyRequestRoute from "./Routes/supplyRequestRoute.js";
import promotionRoute from "./Routes/PromotionRoute.js";
import productRoute from "./Routes/productRouter.js";
import orderRoute from "./Routes/orderRouter.js";
import serviceRouter from "./Routes/serviceRouter.js"; // Fixed service route import

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB database connection established successfully"))
  .catch((error) => {
    console.error("❌ Connection error:", error);
    process.exit(1);
  });

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

// ✅ Get current logged-in user
app.get('/api/user', (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ error: "Not logged in" });
});

// ✅ Logout
app.get('/auth/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.redirect('http://localhost:3000');
  });
});

// ✅ Health Check /message route (for frontend testing)
app.get("/message", (req, res) => {
  res.status(200).json({ message: "Message endpoint is working!" });
});

// ✅ Main API Routes
app.use("/auth", userRoute);
app.use("/supplies", supplyRoute);
app.use("/supply-request", supplyRequestRoute);
app.use("/coupon", promotionRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/services", serviceRouter); // ✅ Added service routes

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔐 Google Auth callback: /auth/google/callback`);
});

// Object to track users in each room
const usersInRooms = {};

// Function to get users in a room
const getUsersInRoom = (room) => {
  return usersInRooms[room] || [];
};

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // Handle joining a room
  socket.on("joinRoom", ({ username, room }) => {
    // Add user to the room's list of users
    if (!usersInRooms[room]) {
      usersInRooms[room] = [];
    }

    if (!usersInRooms[room].includes(username)) {
      usersInRooms[room].push(username);
    }

    // Join the room
    socket.join(room);
    console.log(`${username} joined room ${room}`);

    // Emit the updated list of users in the room to everyone in the room
    io.to(room).emit("roomData", { users: getUsersInRoom(room) });

    // Inform the room that a user has joined
    io.to(room).emit("message", { user: "Admin", text: `${username} has joined the chat` });
  });

  // Handle sending messages
  socket.on("sendMessage", (message, room) => {
    console.log(`📩 Received message:`, message, "in", room);
    io.to(room).emit("message", message);
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    // Find and remove the user from the room they were in
    for (let room in usersInRooms) {
      const index = usersInRooms[room].indexOf(socket.id);
      if (index !== -1) {
        // Remove user from the room when they disconnect
        const username = usersInRooms[room].splice(index, 1)[0];
        io.to(room).emit("roomData", { users: getUsersInRoom(room) });
        io.to(room).emit("message", { user: "Admin", text: `${username} has left the chat` });
        console.log(`${username} has disconnected from room: ${room}`);
      }
    }
  });
});

