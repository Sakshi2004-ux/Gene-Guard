import { callGeminiForReportSimplification } from './services/geminiService.js';
import { initGeminiClient } from './services/geminiService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gemini API directly...');
console.log('API Key:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');

initGeminiClient(process.env.GEMINI_API_KEY);

try {
  const result = await callGeminiForReportSimplification({
    geneName: 'BRCA1',
    clinicalNote: 'BRCA1 heterozygous variant detected',
    riskLevel: 'High',
    findingType: 'Mutation marker'
  });
  console.log('✓ Gemini Response:', result.substring(0, 200));
} catch (err) {
  console.error('✗ Gemini Error:', err.message);
}
