import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load .env
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0 && !key.startsWith('#')) {
      process.env[key.trim()] = value.join('=').trim();
    }
  });
}

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const PAINSTACK_VOICE_ID = 'RXtWW6etvimS8QJ5nhVk'; // Fiona - chill, natural & Real
const MODEL_ID = 'eleven_multilingual_v2';

const CRITICAL_SCRIPTS = [
  { id: 'v4_s4_wait_p', text: 'Analyzing 3,241 local conversations about this problem...' },
  { id: 'v4_s5_blue_p', text: 'The market data is clear. Move forward.' },
  { id: 'v4_s6_t1_p', text: 'Verdict: build. Your AI team is entering now.' },
  { id: 'v4_s10_t2_p', text: 'The roadmap is clear.' },
  { id: 'v4_s16_hook_p', text: 'To business.' },
  { id: 'v4_s17_close', text: 'Painstack AI. From idea to business.' },
];

async function generateAudio(s) {
  const outputPath = path.join(ROOT, 'public', 'audio', `${s.id}.mp3`);
  console.log(`🎙  Targeting: ${s.id}.mp3...`);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${PAINSTACK_VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: s.text, model_id: MODEL_ID, voice_settings: { stability: 0.75, similarity_boost: 0.85 } })
  });

  if (!response.ok) throw new Error(await response.text());
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`   ✓ Success!`);
}

async function run() {
  for (const s of CRITICAL_SCRIPTS) {
    try { await generateAudio(s); await new Promise(r => setTimeout(r, 2000)); }
    catch (e) { console.error(`   ❌ Failed: ${e.message}`); }
  }
}
run();
