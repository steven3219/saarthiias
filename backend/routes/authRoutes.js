const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST /api/auth/login
// @desc    Authenticate user & get tokens
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check for existing user [cite: 68]
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 2. Validate password [cite: 69, 74]
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Generate JWT Access Token [cite: 72]
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Secure access token duration
    );

    // 4. Return standard API payload structure [cite: 254]
    return res.status(200).json({
      success: true,
      message: 'Operation successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;