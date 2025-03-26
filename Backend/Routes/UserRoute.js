import express from "express";
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


export default userRouter;
