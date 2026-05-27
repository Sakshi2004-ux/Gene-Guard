import Patient from '../models/Patient.js';
import DNATest from '../models/DNATest.js';
import TestResult from '../models/TestResult.js';

const log = (msg, level = 'info') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${msg}`);
};

// ================================================================
// PATIENT FUNCTIONS
// ================================================================

export const saveOrUpdatePatient = async (patientData) => {
  try {
    const { email, firstName, lastName, ...otherData } = patientData;

    // Check if patient exists by email
    let patient = await Patient.findOne({ email });

    if (patient) {
      // Update existing patient
      Object.assign(patient, { firstName, lastName, ...otherData });
      await patient.save();
      log(`Patient updated: ${email}`, 'info');
    } else {
      // Create new patient
      patient = new Patient({
        email,
        firstName,
        lastName,
        ...otherData,
      });
      await patient.save();
      log(`New patient created: ${email}`, 'info');
    }

    return patient;
  } catch (error) {
    log(`Error saving patient: ${error.message}`, 'error');
    throw error;
  }
};

export const getPatientById = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      log(`Patient not found: ${patientId}`, 'warn');
      return null;
    }
    return patient;
  } catch (error) {
    log(`Error retrieving patient: ${error.message}`, 'error');
    throw error;
  }
};

export const getPatientByEmail = async (email) => {
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      log(`Patient not found by email: ${email}`, 'warn');
      return null;
    }
    return patient;
  } catch (error) {
    log(`Error retrieving patient by email: ${error.message}`, 'error');
    throw error;
  }
};

// ================================================================
// DNA TEST FUNCTIONS
// ================================================================

export const saveDNATest = async (patientId, testData) => {
  try {
    const dnaTest = new DNATest({
      patientId,
      ...testData,
    });
    await dnaTest.save();
    log(`DNA test created: ${dnaTest._id} for patient ${patientId}`, 'info');
    return dnaTest;
  } catch (error) {
    log(`Error saving DNA test: ${error.message}`, 'error');
    throw error;
  }
};

export const getDNATestById = async (testId) => {
  try {
    const test = await DNATest.findById(testId).populate('patientId');
    if (!test) {
      log(`DNA test not found: ${testId}`, 'warn');
      return null;
    }
    return test;
  } catch (error) {
    log(`Error retrieving DNA test: ${error.message}`, 'error');
    throw error;
  }
};

export const getDNATestsByPatient = async (patientId) => {
  try {
    const tests = await DNATest.find({ patientId }).sort({ createdAt: -1 });
    log(`Retrieved ${tests.length} DNA tests for patient ${patientId}`, 'info');
    return tests;
  } catch (error) {
    log(`Error retrieving DNA tests: ${error.message}`, 'error');
    throw error;
  }
};

export const updateDNATestStatus = async (testId, status, updates = {}) => {
  try {
    const test = await DNATest.findByIdAndUpdate(
      testId,
      { status, ...updates },
      { new: true }
    );
    log(`DNA test status updated: ${testId} → ${status}`, 'info');
    return test;
  } catch (error) {
    log(`Error updating DNA test status: ${error.message}`, 'error');
    throw error;
  }
};

// ================================================================
// TEST RESULT FUNCTIONS
// ================================================================

export const saveTestResult = async (resultData) => {
  try {
    const result = new TestResult(resultData);
    await result.save();
    log(`Test result saved: ${result._id} for agent ${resultData.agentId}`, 'info');
    return result;
  } catch (error) {
    log(`Error saving test result: ${error.message}`, 'error');
    throw error;
  }
};

export const getTestResultById = async (resultId) => {
  try {
    const result = await TestResult.findById(resultId)
      .populate('patientId')
      .populate('testId');
    if (!result) {
      log(`Test result not found: ${resultId}`, 'warn');
      return null;
    }
    return result;
  } catch (error) {
    log(`Error retrieving test result: ${error.message}`, 'error');
    throw error;
  }
};

export const getTestResultsByPatient = async (patientId) => {
  try {
    const results = await TestResult.find({ patientId })
      .populate('testId')
      .sort({ createdAt: -1 });
    log(`Retrieved ${results.length} test results for patient ${patientId}`, 'info');
    return results;
  } catch (error) {
    log(`Error retrieving test results: ${error.message}`, 'error');
    throw error;
  }
};

export const getTestResultsByTest = async (testId) => {
  try {
    const results = await TestResult.find({ testId }).sort({ createdAt: -1 });
    log(`Retrieved ${results.length} results for test ${testId}`, 'info');
    return results;
  } catch (error) {
    log(`Error retrieving results by test: ${error.message}`, 'error');
    throw error;
  }
};

export const getResultsByAgent = async (patientId, agentId) => {
  try {
    const results = await TestResult.find({
      patientId,
      agentId,
    }).sort({ createdAt: -1 });
    log(`Retrieved ${results.length} results for agent ${agentId}`, 'info');
    return results;
  } catch (error) {
    log(`Error retrieving results by agent: ${error.message}`, 'error');
    throw error;
  }
};

// ================================================================
// PATIENT HISTORY & SUMMARY
// ================================================================

export const getPatientFullHistory = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    const tests = await DNATest.find({ patientId }).sort({ createdAt: -1 });
    const results = await TestResult.find({ patientId }).sort({ createdAt: -1 });

    return {
      patient,
      tests,
      results,
      totalTests: tests.length,
      totalResults: results.length,
    };
  } catch (error) {
    log(`Error retrieving patient full history: ${error.message}`, 'error');
    throw error;
  }
};

export const getPatientDashboard = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    const recentTests = await DNATest.find({ patientId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentResults = await TestResult.find({ patientId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Count by risk level
    const riskCounts = await TestResult.aggregate([
      { $match: { patientId } },
      { $group: { _id: '$riskLevel', count: { $sum: 1 } } },
    ]);

    // Count by agent
    const agentCounts = await TestResult.aggregate([
      { $match: { patientId } },
      { $group: { _id: '$agentId', count: { $sum: 1 } } },
    ]);

    return {
      patient,
      recentTests,
      recentResults,
      riskCounts,
      agentCounts,
      lastActivity: recentResults[0]?.createdAt || patient.updatedAt,
    };
  } catch (error) {
    log(`Error retrieving patient dashboard: ${error.message}`, 'error');
    throw error;
  }
};

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

export const deletePatientData = async (patientId) => {
  try {
    await Patient.findByIdAndDelete(patientId);
    await DNATest.deleteMany({ patientId });
    await TestResult.deleteMany({ patientId });
    log(`All data deleted for patient ${patientId}`, 'info');
  } catch (error) {
    log(`Error deleting patient data: ${error.message}`, 'error');
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const stats = {
      totalPatients: await Patient.countDocuments(),
      totalTests: await DNATest.countDocuments(),
      totalResults: await TestResult.countDocuments(),
      testsByType: await DNATest.aggregate([
        { $group: { _id: '$testType', count: { $sum: 1 } } },
      ]),
      resultsByAgent: await TestResult.aggregate([
        { $group: { _id: '$agentId', count: { $sum: 1 } } },
      ]),
      riskDistribution: await TestResult.aggregate([
        { $group: { _id: '$riskLevel', count: { $sum: 1 } } },
      ]),
    };
    log('Statistics retrieved', 'info');
    return stats;
  } catch (error) {
    log(`Error retrieving statistics: ${error.message}`, 'error');
    throw error;
  }
};
