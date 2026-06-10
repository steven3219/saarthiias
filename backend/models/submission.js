// Submission & Evaluation Schema
const SubmissionSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  textResponse: { type: String, required: true },
  isCompleted: { type: Boolean, default: true },
  evaluation: {
    evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, min: 0, max: 100 },
    strengths: { type: String },
    weaknesses: { type: String },
    suggestions: { type: String },
    aiSuggestions: { type: String },
    evaluatedAt: { type: Date }
  }
}, { timestamps: true });

SubmissionSchema.index({ 'evaluation.evaluatorId': 1 });
const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = { Task, Submission };