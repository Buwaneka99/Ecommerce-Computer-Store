import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import session from "express-session";
import passport from "./Config/passport.js";
import userRoute from "./Routes/UserRoute.js";
import supplyRoute from "./Routes/supplyRoute.js";
import supplyRequestRoute from "./Routes/supplyRequestRoute.js";
import promotionRoute from "./Routes/PromotionRoute.js";
import productRoute from "./Routes/productRouter.js";
import orderRoute from "./Routes/orderRouter.js";
import serviceRouter from "./Routes/serviceRouter.js";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.error("❌ Connection error:", error);
    process.exit(1);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/api/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ error: "Not logged in" });
});

app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.redirect("http://localhost:3000");
  });
});

app.get("/message", (req, res) => {
  res.status(200).json({ message: "Message endpoint is working!" });
});

app.use("/auth", userRoute);
app.use("/supplies", supplyRoute);
app.use("/supply-request", supplyRequestRoute);
app.use("/coupon", promotionRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/services", serviceRouter);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔐 Google Auth callback URL: ${process.env.GOOGLE_CALLBACK_URL}`);
});