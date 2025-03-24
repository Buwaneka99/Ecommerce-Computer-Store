import express from 'express';
const userController = require('../Controllers/UserController.js');

const userRoute = express.Router();

userRoute.post("/login", userLogin);
userRoute.post("/register", UserRegister);
userRoute.get("/", gtAllUsers);
userRoute.get("/:id", getUserById);

module.exports = userRoute;
