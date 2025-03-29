import express from "express";
import passport from "passport";
import {
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
  userLogin,
  userRegister,
  userRegisterAdmin,
} from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/register-admin", userRegisterAdmin);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

// Google Login Route
userRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Authentication failed" });

    // Generate a session token (instead of JWT)
    const sessionToken = `${req.user._id}-${new Date().getTime()}`;
    
    // Save the sessionToken in the database
    req.user.token = sessionToken;
    await req.user.save();

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/dashboard?token=${sessionToken}`);
  }  
);

// Get User by Token (For Dashboard)
userRouter.get("/", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const user = await User.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  res.json(user);
});


export default userRouter;
