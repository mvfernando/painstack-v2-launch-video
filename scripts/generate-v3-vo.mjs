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
// Using "Sarah" voice which fits the character
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; 
const MODEL_ID = 'eleven_multilingual_v2';

const VOICE_SETTINGS = {
  stability: 0.65,
  similarity_boost: 0.85,
  style: 0.15,
  use_speaker_boost: true,
};

const SCRIPTS = [
  { id: 'v3_s1_open',   text: 'Painstack AI. From idea to business.' },
  { id: 'v3_s2_pain',   text: 'Every Friday. Same panic. Who watches the kids? There has to be a better way.' },
  { id: 'v3_s3_input',  text: "So I just describe it. Parents in my neighbourhood waste hours every week trying to find a trusted sitter. There's no easy way to find anyone vetted, especially last minute." },
  { id: 'v3_s4_wait',   text: "Now it's scanning Reddit. Real complaints. Real evidence. It's not just a guess anymore." },
  { id: 'v3_s5_blue',   text: 'Fifty-two seconds later. A Blueprint. Score 81. Build. The market actually wants this.' },
  { id: 'v3_s6_t1',     text: 'Verdict: build. And then, the team enters.' },
  { id: 'v3_s7_market', text: "The Market Agent tells me no one is doing this locally. And my AI CEO? He's already got a ninety-day plan. This is what I would've paid a consultant thousands for." },
  { id: 'v3_s8_cmo',    text: 'The CMO has my Facebook hooks ready. I could literally send this today.' },
  { id: 'v3_s9_cto',    text: "And the CTO? I don't know how to code, but he says I can build the MVP with Lovable and Supabase. Zero code." },
  { id: 'v3_s10_t2',    text: 'The agents built the plan. Now the roadmap executes it.' },
  { id: 'v3_s11_road',  text: "I'm in week three. I know exactly what I need to do tomorrow morning." },
  { id: 'v3_s12_t3',    text: "And when the time comes to talk to investors, I'm ready." },
  { id: 'v3_s13_data',  text: "An entire Dataroom. Eight documents. I didn't write a single one, but they're all here." },
  { id: 'v3_s14_out',   text: 'From a Friday panic to a real startup.' },
  { id: 'v3_s15_stat',  text: 'An honest verdict in under a minute. Ninety days to customers. Zero code.' },
  { id: 'v3_s16_hook',  text: "You don't need a team. You don't need to code. You just need a real problem." },
  { id: 'v3_s17_close', text: 'Your idea is waiting. Painstack AI.' },
];

async function generateAudio(id, text) {
  const outputPath = path.join(ROOT, 'public', 'audio', `${id}.mp3`);

  console.log(`🎙  Generating: ${id}.mp3...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: VOICE_SETTINGS,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs error: ${error}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`   ✓ Saved to public/audio/${id}.mp3`);
}

async function run() {
  for (const s of SCRIPTS) {
    try {
      await generateAudio(s.id, s.text);
      await new Promise(r => setTimeout(r, 800)); // rate limit buffer
    } catch (e) {
      console.error(`   ❌ Failed ${s.id}:`, e.message);
    }
  }
}

run();
