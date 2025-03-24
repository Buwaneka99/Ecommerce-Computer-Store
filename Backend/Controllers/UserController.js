import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const UserRegister = async (req, res) => {
  const { username, phoneNumber, email, password } = req.body;
  
  try{

   const emailExist = await User.findOne({ email });  

    if (emailExist) {
        return res.status(409).json({ error: "Email already exists" });
    }
    else {
        const newUser = await User.create({
            username,
            phoneNumber,
            email,
            password,
        });
      
          res.status(201).json({newUser});
    }

  } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
        }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {

  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
}

