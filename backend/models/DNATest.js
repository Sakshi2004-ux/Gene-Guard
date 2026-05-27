import mongoose from 'mongoose';

const DNATestSchema = new mongoose.Schema(
  {
    // Reference to patient
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },

    // Test Details
    testType: {
      type: String,
      enum: ['Health risk screening', 'Carrier screening', 'Hereditary disorder testing', 'Lifestyle / wellness'],
      required: true,
    },
    samplePreference: {
      type: String,
      enum: ['Saliva', 'Blood', 'Not sure'],
      default: 'Not sure',
    },
    fastingStatus: {
      type: String,
      enum: ['Yes', 'No'],
    },
    shippingMode: {
      type: String,
      enum: ['Home kit pickup', 'Self courier', 'Hospital / clinic visit'],
    },
    familyMemberRelation: String,

    // Test Status
    status: {
      type: String,
      enum: ['pending', 'sample_collected', 'in_lab', 'completed', 'error'],
      default: 'pending',
    },

    // Test Purpose
    purpose: {
      type: String,
      enum: ['General awareness', 'Health risk check', 'Inherited disease concern', 'Family planning'],
    },

    // Urgency
    urgency: {
      type: String,
      enum: ['Routine', 'Need clarity soon', 'High concern'],
      default: 'Routine',
    },

    // Report availability
    reportAvailable: {
      type: Boolean,
      default: false,
    },
    reportFile: String, // Path to uploaded report

    // Test Notes
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('DNATest', DNATestSchema);
