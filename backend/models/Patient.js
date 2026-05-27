import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Health Information
    age: {
      type: Number,
      min: 1,
      max: 150,
      required: true,
    },
    sex: {
      type: String,
      enum: ['Female', 'Male', 'Other'],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    familyHistory: {
      type: String,
      enum: ['No', 'Yes'],
      default: 'No',
    },
    knownDisorder: {
      type: String,
      trim: true,
    },
    currentSymptoms: {
      type: String,
      enum: ['No symptoms', 'Mild symptoms', 'Recurring symptoms', 'Severe'],
      default: 'No symptoms',
    },
    medications: {
      type: String,
      trim: true,
    },

    // Emergency Contact
    emergencyContactName: String,
    emergencyContact: String,
    location: {
      type: String,
      trim: true,
    },

    // Account Status
    consultedDoctor: {
      type: String,
      enum: ['No', 'Yes'],
      default: 'No',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Patient', PatientSchema);
