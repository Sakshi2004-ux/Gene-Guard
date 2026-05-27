import Anthropic from '@anthropic-ai/sdk';

const apiKey = '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';

const client = new Anthropic({ apiKey });

try {
  console.log('Testing Claude API connection...');
  const response = await client.messages.create({
    model: 'claude-opus-4-1',
    max_tokens: 50,
    messages: [{ role: 'user', content: 'Say OK' }],
  });
  console.log('✅ Claude API working');
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  console.log('Response:', text);
} catch (error) {
  console.error('❌ Claude API Error:', error.message);
  if (error.status) console.error('Status:', error.status);
}
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
console.log('Testing Claude with new API key...\n');

const client = new Anthropic({ apiKey });

try {
  const response = await client.messages.create({
    model: 'claude-opus-4-1',
    max_tokens: 50,
    messages: [{ role: 'user', content: 'Say OK to confirm you are working' }],
  });
  
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  console.log('✅ Claude API Authentication: SUCCESS');
  console.log('Response:', text);
  console.log('\nAll 6 agents will now use Claude!\n');
} catch (error) {
  console.error('❌ Claude API Error:', error.message);
  if (error.status) console.error('Status:', error.status);
}
