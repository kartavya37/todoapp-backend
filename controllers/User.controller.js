import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import genToken from '../config/token.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validation: Check for missing fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Validate password length
        if (password.length <= 4) {
            return res.status(400).json({ message: "Password must be longer than 6 characters" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        // Generate JWT token
        const token = genToken(newUser._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });

        res.status(201).json({ message: "User registered successfully", newUser, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "email does not exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = genToken(existingUser._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });

        // Send response without password
        const { password: _, ...userWithoutPassword } = existingUser.toObject();

        res.status(200).json({ 
            message: "User logged in successfully", 
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly : true,
            sameSite: "strict",
            path: '/'
        }) 
        res.status(200).json({message : "user logout"})
    } catch (error) {
        return res.status(500).json({message : "error occured in logging out"})
    }
}

export const getMe = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};
