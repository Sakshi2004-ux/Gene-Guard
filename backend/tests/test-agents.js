/**
 * Test script for all 6 DNA agents with Claude enhancement
 */

const BASE_URL = 'http://localhost:5050/api/dna';

// Test patient profile
const testPatient = {
  fullName: 'Test Patient',
  age: '35',
  sex: 'Female',
  bloodGroup: 'O+',
  familyHistory: 'Yes',
  knownDisorder: 'Thalassemia in sibling',
  symptoms: 'Mild symptoms',
  purpose: 'Family planning',
  consultedDoctor: 'No',
  medications: 'None',
  location: 'Mumbai',
  emergencyContact: '9876543210',
  emergencyContactName: 'John Doe',
};

const tests = [
  {
    name: 'Guidance Agent',
    agentId: 'guidance-agent',
    formData: {
      age: testPatient.age,
      sex: testPatient.sex,
      familyHistory: testPatient.familyHistory,
      knownDisorder: testPatient.knownDisorder,
      symptoms: testPatient.symptoms,
      purpose: testPatient.purpose,
    },
  },
  {
    name: 'Test Suggestion Agent',
    agentId: 'test-suggestion-agent',
    formData: {
      familyHistory: testPatient.familyHistory,
      goal: 'Family planning',
      urgency: 'Need clarity soon',
      bloodGroup: testPatient.bloodGroup,
      reportAvailable: 'No',
    },
  },
  {
    name: 'Sample Process Agent',
    agentId: 'sample-process-agent',
    formData: {
      testType: 'Carrier screening',
      samplePreference: 'Saliva',
      fastingStatus: 'Yes',
      shippingMode: 'Home kit pickup',
      familyMemberRelation: 'None',
    },
  },
  {
    name: 'Report Simplifier Agent',
    agentId: 'report-simplifier-agent',
    formData: {
      riskLevel: 'Moderate',
      findingType: 'Gene variation',
      geneName: 'BRCA1',
      clinicalNote: 'BRCA1 heterozygous variant detected, may indicate increased breast cancer risk',
    },
  },
  {
    name: 'Recommendation Agent',
    agentId: 'recommendation-agent',
    formData: {
      riskLevel: 'Moderate',
      consultedDoctor: 'No',
      familyHistory: testPatient.familyHistory,
      goal: 'Understand next steps',
      medications: testPatient.medications,
    },
  },
  {
    name: 'Escalation Agent',
    agentId: 'escalation-agent',
    formData: {
      riskLevel: 'Moderate',
      location: testPatient.location,
      emergencyContact: testPatient.emergencyContact,
      emergencyContactName: testPatient.emergencyContactName,
      symptoms: testPatient.symptoms,
    },
  },
];

async function runTests() {
  console.log('🧬 Testing Gene-Guard AI Agents\n');
  console.log('Patient Profile:', testPatient.fullName);
  console.log('================================\n');

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      const response = await fetch(`${BASE_URL}/run/${test.agentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: test.formData, patient: testPatient }),
      });

      const data = await response.json();

      if (data.success && data.output) {
        const aiStatus = data.aiEnhanced ? ' ✓ AI-ENHANCED' : ' (rule-based fallback)';
        console.log(`  ✅ PASS${aiStatus}`);
        console.log(`  Title: ${data.output.title}`);
        console.log(`  Summary: ${data.output.summary?.substring(0, 80)}...`);
        console.log();
        passed++;
      } else {
        console.log(`  ❌ FAIL: ${data.error || 'Unknown error'}`);
        console.log();
        failed++;
      }
    } catch (error) {
      console.log(`  ❌ ERROR: ${error.message}`);
      console.log();
      failed++;
    }
  }

  console.log('================================');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`Success rate: ${Math.round((passed / tests.length) * 100)}%`);

  if (failed === 0) {
    console.log('\n✅ All agents are working!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some agents failed.');
    process.exit(1);
  }
}

runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
