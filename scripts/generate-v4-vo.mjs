import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Unified Voiceover Generation Script - Sarah Edition
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Sync Load .env
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

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "RXtWW6etvimS8QJ5nhVk";

if (!API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY is missing from .env');
  process.exit(1);
}

const OUTPUT_DIR = path.join(ROOT, 'public', 'audio');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateAudio(text, filename) {
  console.log(`🎙  Generating ${filename}.mp3...`);
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.65, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ Error generating ${filename}: ${response.status}`, errorText);
      return;
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(path.join(OUTPUT_DIR, `${filename}.mp3`), Buffer.from(buffer));
    
    // Estimate or log duration (placeholder for now as fetch response doesn't give duration)
    console.log(`   ✓ Saved public/audio/${filename}.mp3`);
    
    // Safety buffer (increased for reliability)
    await new Promise(r => setTimeout(r, 1000));
  } catch (err) { 
    console.error(`   ❌ Failed ${filename}:`, err); 
    throw err; // Propagate error to trigger exit code 1
  }
}

async function main() {
  const scripts = [
    // --- MAIN NARRATION (Sarah - First Person "Modo Leigo") ---
    { text: "I've always had too many ideas. ... But then Friday hits... and the panic sets in.", filename: "v4_s1_open" },
    { text: "For entrepreneurs with too many ideas. Painstack is your AI validation engine. Real evidence. Zero guessing.", filename: "v4_s1b_teaser" },
    { text: "Uff, okay... Who watches the kids? ... There has to be a better way than this.", filename: "v4_s2_pain" },
    { text: "So I just... describe it. Like parents in my area wasting hours finding a sitter.", filename: "v4_s3_input" },
    { text: "It's scanning everywhere. ... Finding signals I didn't even see.", filename: "v4_s4_wait_s" },
    { text: "Score 81? ... Okay, this isn't just hype. ... This is buildable.", filename: "v4_s5_blue_s" },
    { text: "Verdict: Build. ... And my AI team is already here.", filename: "v4_s6_t1" },
    { text: "My Market Agent confirms it: ... nobody is doing this locally. I'm first.", filename: "v4_s7_market" },
    { text: "My CMO built the whole campaign. ... I could literally send this today.", filename: "v4_s8_cmo" },
    { text: "I'm not a coder, ... but my CTO says I don't need to be. Lovable and Supabase.", filename: "v4_s9_cto" },
    { text: "Week three. ... I know exactly what to do tomorrow morning.", filename: "v4_s11_road" },
    { text: "And when the time comes to talk to investors? ... I'm actually ready.", filename: "v4_s12_t3" },
    { text: "Eight documents. I didn't write a single one, but they're all here.", filename: "v4_s13_data" },
    { text: "From a Friday panic... to a real startup.", filename: "v4_s14_out" },
    { text: "An honest verdict in under a minute. Ninety days to customers. Zero code.", filename: "v4_s15_stat" },
    { text: "Painstack dot A I. Build the future today.", filename: "v4_s17_close" },

    // --- CONSOLIDATED PLATFORM VOICES (Now also Sarah - Technical but matching tone) ---
    { text: "Analyzing 3,241 local conversations about this problem...", filename: "v4_s4_wait_p" },
    { text: "The market data is clear. Move forward.", filename: "v4_s5_blue_p" },
    { text: "Verdict: build. Your AI team is entering now.", filename: "v4_s6_t1_p" },
    { text: "The roadmap is clear. Proceed with the build.", filename: "v4_s10_t2_p" },
    { text: "The agents built the plan. The roadmap executes it.", filename: "v4_s10_t2" },
    { text: "To business.", filename: "v4_s16_hook_p" },
    { text: "You don't need a team. You don't need to code. You need a real problem. Your idea is waiting.", filename: "v4_s16_hook_s" },
  ];

  console.log(`\n🚀 Starting Generation for ${scripts.length} voiceovers...`);
  console.log(`🎙  Using Voice: ${VOICE_ID}\n`);

  for (const script of scripts) {
    await generateAudio(script.text, script.filename);
  }

  console.log(`\n✅ Done! File generated in public/audio/`);
}

main().catch(console.error);
