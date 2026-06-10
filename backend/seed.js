const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing users to prevent duplicate errors
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  const mockUsers = [
    { name: 'System Admin', email: 'admin@sarrthi.com', password: passwordHash, role: 'Admin' },
    { name: 'Ramesh Kumar (Mentor)', email: 'mentor@sarrthi.com', password: passwordHash, role: 'Mentor' },
    { name: 'Anjali Sharma (Evaluator)', email: 'evaluator@sarrthi.com', password: passwordHash, role: 'Evaluator' },
    { name: 'Siddharth Singh (Student)', email: 'student@sarrthi.com', password: passwordHash, role: 'Student', mobileNumber: '9628851682', targetUPSCYear: 2026 }
  ];

  await User.insertMany(mockUsers);
  console.log('✅ Mock Roles Successfully Injected into MongoDB Atlas!');
  process.exit();
};

seedUsers();