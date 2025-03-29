import User from "../Models/User.js";
//import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  
  try{
    const { username, phoneNumber, email, password } = req.body;
    //console.log(req.body);

   const emailExist = await User.findOne({ email });  

    if (emailExist) {
      return res.status(409).json({ error: "Email already exists" });
    }
    else {

      // Hash the password (with salt rounds = 10)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      });
      
      res.status(201).json({newUser});
    }

  } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

    res.status(200).json({ user: user });
    } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
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

    res.status(200).json({ user });
  } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, phoneNumber } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userRegisterAdmin = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "User already exists" });
    } else {

      // Hash the password (with salt rounds = 10)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAdmin = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
      });
      res.status(201).json({ user: newAdmin });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { id_token } = req.body;

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name: username } = payload;

    // Check if user exists in DB or create new
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        username,
        email,
        role: 'user', // Default role, adjust as needed
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}