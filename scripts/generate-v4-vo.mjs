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

// Sarah: Female, Human-like (Compatible Fallback)
const SARAH_VOICE_ID = '21m00Tcm4TlvDq8ikKAt'; // Rachel
const SARAH_SETTINGS = {
  stability: 0.45, 
  similarity_boost: 0.75,
  style: 0.4,      
  use_speaker_boost: true,
};

// Painstack: Male, Steady/AI-Assistant
const PAINSTACK_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam (Standard Fallback)
const PAINSTACK_SETTINGS = {
  stability: 0.75,
  similarity_boost: 0.85,
  style: 0.05,
  use_speaker_boost: true,
};

const MODEL_ID = 'eleven_multilingual_v2';

const SCRIPTS = [
  // Scene 1: Brand Open (Painstack)
  { id: 'v4_s1_open',   voice: 'product', text: 'Painstack. From idea to business.' },
  
  // Scene 2: Pain (Sarah) - THE TIRED INTRO
  { id: 'v4_s2_pain',   voice: 'sarah',   text: 'Uff, ok... friday night panic. Who watches the kids? There has to be a better way.' },
  
  // Scene 3: Input (Sarah)
  { id: 'v4_s3_input',  voice: 'sarah',   text: "So I just... describe it. Parents in my neighbourhood waste hours every week trying to find a trusted sitter. There's no easy way to find anyone vetted, especially last minute." },
  
  // Scene 4: Wait (Sarah + Product)
  { id: 'v4_s4_wait_s', voice: 'sarah',   text: "Now it's scanning Reddit. Actual complaints." },
  { id: 'v4_s4_wait_p', voice: 'product', text: "Analyzing 3,241 local conversations about this problem..." },
  
  // Scene 5: Blueprint (Sarah + Product)
  { id: 'v4_s5_blue_s', voice: 'sarah',   text: '81. This is real. The market actually wants this.' },
  { id: 'v4_s5_blue_p', voice: 'product', text: 'The market data is clear. Move forward.' },
  
  // Scene 6: Transition 1 (Product)
  { id: 'v4_s6_t1',     voice: 'product', text: 'Verdict: build. Your AI team is entering now.' },
  
  // Scene 7: Market + CEO (Sarah)
  { id: 'v4_s7_market', voice: 'sarah',   text: "The Agent says no one is doing this locally. And my AI CEO? A ninety-day plan. This is gold." },
  
  // Scene 8: CMO (Sarah)
  { id: 'v4_s8_cmo',    voice: 'sarah',   text: 'Facebook hooks ready. I could literally send this today.' },
  
  // Scene 9: CTO (Sarah)
  { id: 'v4_s9_cto',    voice: 'sarah',   text: "I don't know how to code, but he says I can build the MVP with zero code. Just Lovable and Supabase." },
  
  // Scene 10: Transition 2 (Product)
  { id: 'v4_s10_t2',    voice: 'product', text: 'The roadmap is clear.' },
  
  // Scene 11: Roadmap (Sarah)
  { id: 'v4_s11_road',  voice: 'sarah',   text: "Week three. I know exactly what I need to do tomorrow morning." },
  
  // Scene 12: Transition 3 (Product)
  { id: 'v4_s12_t3',    voice: 'product', text: "And now, you're ready to talk to investors." },
  
  // Scene 13: Dataroom (Sarah)
  { id: 'v4_s13_data',  voice: 'sarah',   text: "An entire Dataroom. Eight documents. I didn't write a single one." },
  
  // Scene 14: Zoom Out (Sarah)
  { id: 'v4_s14_out',   voice: 'sarah',   text: 'From a friday panic... to a real startup.' },
  
  // Scene 15: Stats (Sarah)
  { id: 'v4_s15_stat',  voice: 'sarah',   text: "It's real. We have a clear path." },
  
  // Scene 16: Hook Final (Sarah + Product)
  { id: 'v4_s16_hook_s', voice: 'sarah',   text: "From idea..." },
  { id: 'v4_s16_hook_p', voice: 'product', text: "To business." },
  
  // Scene 17: Close (Product)
  { id: 'v4_s17_close',  voice: 'product', text: 'Your idea is waiting. Painstack. From idea to business.' },
];

async function generateAudio(s) {
  const outputPath = path.join(ROOT, 'public', 'audio', `${s.id}.mp3`);
  const voiceId = s.voice === 'sarah' ? SARAH_VOICE_ID : PAINSTACK_VOICE_ID;
  const settings = s.voice === 'sarah' ? SARAH_SETTINGS : PAINSTACK_SETTINGS;

  console.log(`🎙  Generating: ${s.id}.mp3 (${s.voice})...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: s.text,
        model_id: MODEL_ID,
        voice_settings: settings,
      }),
    }
  );

  const buffer = await response.arrayBuffer();
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath); 
  }
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`   ✓ Saved to public/audio/${s.id}.mp3`);
}

async function run() {
  for (const s of SCRIPTS) {
    try {
      await generateAudio(s);
      await new Promise(r => setTimeout(r, 600)); // rate limit buffer
    } catch (e) {
      console.error(`   ❌ Failed ${s.id}:`, e.message);
    }
  }
}

run();
