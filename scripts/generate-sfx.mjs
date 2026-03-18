import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Carregar .env manualmente
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

const OUTPUT_DIR = path.join(ROOT, 'public', 'audio');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const SFX_LIST = [
  { id: 'sfx_ui_pop', text: 'Subtle clean UI pop notification sound', duration: 0.5 },
  { id: 'sfx_whoosh_clean', text: 'Fast cinematic whoosh air sound', duration: 1.0 },
  { id: 'sfx_glitch', text: 'Short digital glitch static sound', duration: 0.8 },
  { id: 'sfx_typing', text: 'Mechanical keyboard typing sound sequence', duration: 2.0 },
  { id: 'sfx_click', text: 'Clean mouse click UI sound', duration: 0.5 },
  { id: 'sfx_power_up', text: 'Cinematic digital power up charging sound', duration: 2.5 },
  { id: 'sfx_success_chime', text: 'Triumphant digital success chime notification', duration: 2.0 },
  { id: 'sfx_ui_glitch', text: 'Quick UI digital glitch sound', duration: 0.5 },
];

async function generateSFX(id, text, duration) {
  const outputPath = path.join(OUTPUT_DIR, `${id}.mp3`);
  console.log(`🔊 Gerando SFX: ${id}`);
  
  const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      duration_seconds: duration,
      prompt_influence: 0.3,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error (${response.status}): ${error}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`   ✓ Guardado: public/audio/${id}.mp3`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const sfx of SFX_LIST) {
    try {
      await generateSFX(sfx.id, sfx.text, sfx.duration);
    } catch (err) {
      console.error(`   ❌ Erro em ${sfx.id}:`, err.message);
    }
  }
}

main();
