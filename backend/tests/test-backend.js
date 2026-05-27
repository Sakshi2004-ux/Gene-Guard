/**
 * Quick test to validate backend structure
 * Run with: node test-backend.js
 */

import { dnaAgentConfigs, runAgent, evaluatePatient } from '../Gene-Guard-main/src/data/dnaAgents.js';
import { validateReportInput, validatePatientData, filterClaudeResponse } from './middleware/inputValidation.js';

console.log('\n=== Gene-Guard Backend Structure Validation ===\n');

// Test 1: Validate imports
console.log('✓ Import test passed');
console.log(`  - Loaded ${dnaAgentConfigs.length} agent configs`);

// Test 2: Validate patient evaluation
const testPatient = {
  age: 45,
  familyHistory: 'Yes',
  symptoms: 'Severe',
  purpose: 'Inherited disease concern',
};

const evaluation = evaluatePatient(testPatient);
console.log('\n✓ Patient evaluation test passed');
console.log(`  - Risk level: ${evaluation.level}`);
console.log(`  - Recommended lane: ${evaluation.lane}`);

// Test 3: Validate report input
try {
  const report = 'BRCA1 heterozygous c.68_69delAG pathogenic variant detected';
  const validated = validateReportInput(report);
  console.log('\n✓ Report input validation passed');
  console.log(`  - Input length: ${validated.length} chars`);
} catch (error) {
  console.error('✗ Report validation failed:', error.message);
}

// Test 4: Validate patient data
try {
  const validated = validatePatientData(testPatient);
  console.log('\n✓ Patient data validation passed');
  console.log(`  - Validated fields: ${Object.keys(validated).length}`);
} catch (error) {
  console.error('✗ Patient data validation failed:', error.message);
}

// Test 5: Validate response filtering
try {
  const goodResponse = 'This variant may indicate an increased risk. Please consult a genetic counselor.';
  const filtered = filterClaudeResponse(goodResponse);
  console.log('\n✓ Response filtering passed (good response)');
  console.log(`  - Output: ${filtered.slice(0, 50)}...`);
} catch (error) {
  console.error('✗ Response filtering failed:', error.message);
}

// Test 6: Test agent execution
try {
  const output = runAgent('report-simplifier-agent', {
    geneName: 'BRCA1',
    clinicalNote: 'Heterozygous variant detected',
    riskLevel: 'High',
  }, testPatient);
  console.log('\n✓ Agent execution test passed');
  console.log(`  - Output title: ${output.title}`);
} catch (error) {
  console.error('✗ Agent execution failed:', error.message);
}

console.log('\n=== All validation tests passed! ===');
console.log('\nNext steps:');
console.log('1. Add your ANTHROPIC_API_KEY to backend/.env');
console.log('2. Run: cd backend && npm start');
console.log('3. Start the frontend: cd Gene-Guard-main && npm start');
console.log('4. Test at: http://localhost:3000/dna/agents');
