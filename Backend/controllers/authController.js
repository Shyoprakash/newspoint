// import bcrypt from 'bcryptjs';
// import User from '../model/User.js';  // ✅ Ensure correct import path

// export const register = async (req, res) => {
//   try {
//       console.log("📩 Received Data:", req.body); 

//       const { name, password, email } = req.body;

//       if (!name || !password || !email) {
//           return res.status(400).json({ message: "❌ All fields are required" });
//       }

//       const userExists = await User.findOne({ email });
//       if (userExists) {
//           return res.status(409).json({ message: "❌ User already registered, Please Login" });
//       }

//       // 🔴 **Password Hashing**
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       const newUser = await User.create({ name, email, password: hashedPassword });

//       res.status(201).json({
//           data: newUser,
//           message: "✅ Successfully registered",
//       });
//   } catch (error) {
//       console.error("❌ Registration Error:", error);
//       res.status(500).json({ message: "❌ Server error" });
//   }
// };


import bcrypt from 'bcryptjs';
import User from '../model/User.js';

export const register = async (req, res) => {
    try {
        // console.log("📩 Received Data:", req.body); // ✅ Debugging ke liye

        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ message: "❌ All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "❌ User already registered, Please Login" });
        }

        // **Step 1: Password Hashing**
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // console.log("🔑 Plain Password:", password);   // ✅ Check plain password
        // console.log("🧂 Salt Generated:", salt);        // ✅ Check salt
        // console.log("🔒 Hashed Password:", hashedPassword); // ✅ Check hashed password

        // **Step 2: Save User with Hashed Password**
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword  // Store hashed password in DB
        });

        console.log("✅ User Created:", newUser);

        res.status(201).json({
            data: newUser,
            message: "✅ Successfully registered",
        });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "❌ Server error" });
    }
};
