const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Mentor', 'Evaluator', 'Student'], 
    required: true 
  },
  // Student specific profile fields (Optional/Null for other roles)
  mobileNumber: { type: String },
  targetUPSCYear: { type: Number },
  optionalNotes: { type: String },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  profileMetrics: {
    attendancePercentage: { type: Number, default: 100 },
    testsAttempted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    lastEvaluationDate: { type: Date },
    performanceStatus: { 
      type: String, 
      enum: ['Excellent', 'Good', 'Needs Attention', 'Critical'], 
      default: 'Needs Attention' 
    }
  }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Indexing for performance optimization (Module 10)
UserSchema.index({ role: 1, 'profileMetrics.averageScore': -1 });

module.exports = mongoose.model('User', UserSchema);