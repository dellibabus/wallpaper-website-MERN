const Admin = require("../model/adminschema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create admin
const createadmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({ ...req.body, password: hashedPassword });
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ message: "Error creating admin", error: err });
  }
};

// Delete admin
const deleteadmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin has been deleted." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting admin", error: err });
  }
};

// Get all admins
const getadmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    console.log(admins);
    
    res.status(200).json(admins);

  } catch (err) {
    res.status(500).json({ message: "Error fetching admins", error: err });
  }
};

// Login
const login = async (req, res) => {
  try {
    const user = await Admin.findOne({ adminname: req.body.adminname });
    // console.log(req.body);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      
      { id: user._id, onAdmin: user.onAdmin },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1h" }
    );
    // console.log(token);
    

    // Send the token in the response body
    return res.status(200).json({
      status: "ok",
      message: "Login successful",
      user: { id: user._id, adminname: user.adminname },
      token: token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ message: "Error logging in", error: err.message || err });
  }
};

module.exports = {
  createadmin,
  deleteadmin,
  getadmin,
  login,
};
