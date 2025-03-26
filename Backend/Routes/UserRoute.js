const express = require('express');
const userController = require('../Controllers/UserController.js');

const userRoute = express.Router();

userRoute.post("/login", userController.userLogin);
userRoute.post("/register", userController.userRegister);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:id", userController.getUserById);

userRoute.get("/:id", userController.getUserById);
userRoute.put("/:id", userController.updateUser);
userRoute.delete("/:id", userController.deleteUser);

module.exports = userRoute;
