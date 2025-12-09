import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        user: { name: user.name, isAdmin: user.isAdmin },
      });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const setupAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Check if user already exists
    let user = await userModel.findOne({ email });

    if (user) {
      // Update existing user to be admin
      user.isAdmin = true;
      await user.save();
      return res.json({
        success: true,
        message: "User updated to admin",
        user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
      });
    }

    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminData = {
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    };

    const newAdmin = new userModel(adminData);
    const savedAdmin = await newAdmin.save();

    res.json({
      success: true,
      message: "Admin account created successfully",
      user: {
        name: savedAdmin.name,
        email: savedAdmin.email,
        isAdmin: savedAdmin.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, setupAdmin };
