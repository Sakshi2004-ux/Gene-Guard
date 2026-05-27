import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema(
  {
    // References
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DNATest',
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },

    // Agent Information
    agentId: {
      type: String,
      enum: [
        'guidance-agent',
        'test-suggestion-agent',
        'sample-process-agent',
        'report-simplifier-agent',
        'recommendation-agent',
        'escalation-agent',
      ],
      required: true,
    },
    agentName: String,

    // AI Response
    aiResponse: {
      type: String,
      required: true,
    },

    // Analysis
    riskLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High'],
    },
    nextSteps: [String],

    // Evaluation Metrics
    evaluation: {
      riskScore: Number,
      urgencyScore: Number,
      readinessScore: Number,
      inheritanceScore: Number,
      level: String,
      lane: String,
    },

    // Metadata
    inputData: mongoose.Schema.Types.Mixed, // Store the original input for reference
    processingTime: Number, // in milliseconds
    aiModel: {
      type: String,
      enum: ['gemini', 'claude', 'rule-based'],
      default: 'gemini',
    },

    // Status
    isReviewed: {
      type: Boolean,
      default: false,
    },
    reviewNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model('TestResult', TestResultSchema);
