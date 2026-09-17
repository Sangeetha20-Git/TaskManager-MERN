//brings in the password-hashing library.
const bcrypt = require("bcryptjs");

//Import jsonwebtoken
const jwt = require("jsonwebtoken");

//brings in the model we just created.
const User = require("../models/User");

//SIGNUP
// Get details from req.body and Validate the fields
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }

// Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        });
    }

//   Hash the password-bcrypt.hash()
    const hashedPassword = await bcrypt.hash(password, 10);

//   Create User document-User.create()
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
};

//LOGIN

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email id and password are required"
        });
    }

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    //Create JWT
    const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });
};


//me endpoint
const getMe = async (req, res) => {

    try {

        const user = await User
            .findById(req.user.userId)
            .select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.status(200).json({
            success: true,
            user
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//changePassword
// CHANGE PASSWORD
const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        // 1. Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        // 2. Find logged-in user
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Check current password
        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // 4. Prevent using the same password
        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from current password"
            });
        }

        // 5. Validate new password
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters"
            });
        }

        // 6. Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // 7. Save new password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Change password error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    signup,
    login,
    getMe,
    changePassword
};