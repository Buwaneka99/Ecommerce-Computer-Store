import express from "express";
import passport from "passport";
import User from "../Models/User.js";
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
userRouter.get("/all", getAllUsers);  // Changed from "/" to avoid conflict
userRouter.get("/profile/:id", getUserById);  // Changed from "/:id" to avoid conflict
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

// Google Login Route
userRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
userRouter.get("/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "http://localhost:3000/login",
    session: true 
  }),
  async (req, res) => {
    // Generate a session token
    if (!req.user) return res.status(401).json({ message: "Authentication failed" });

    // Generate a session token
    const sessionToken = `${req.user._id}-${new Date().getTime()}`;
      
      // Save the token to the user
      req.user.token = sessionToken;
      
      req.user.save()
        .then(() => {
          res.redirect(`http://localhost:3000/oauth-success?token=${sessionToken}`);
        })
        .catch(err => {
          console.error("Error saving token:", err);
          res.redirect('http://localhost:3000/login');
        });
  }  
);

// Get User by Token
userRouter.get("/token", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const user = await User.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  res.json(user);
});

export default userRouter;
