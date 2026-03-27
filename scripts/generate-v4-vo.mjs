import fs from 'fs';
import path from 'path';

// SARAH ONLY - VOICEOVER SCRIPT GENERATOR
const API_KEY = 'sk_8d2e12cc64227689d8867072a65fae05c90d0cd39201fc3f';
const VOICE_IDS = {
  sarah: "RXtWW6etvimS8QJ5nhVk", // New Voice Share
};

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateAudio(text, filename, voiceId) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.65, similarity_boost: 0.75, use_speaker_boost: true }
      }),
    });

    if (!response.ok) {
      console.error(`Error generating ${filename}: ${response.status}`, await response.text());
      return;
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(path.join(OUTPUT_DIR, `${filename}.mp3`), Buffer.from(buffer));
    console.log(`Saved ${filename}.mp3`);
  } catch (err) { console.error(`Failed ${filename}:`, err); }
}

async function main() {
  const scripts = [
    { text: "Painstack. From idea to business.", filename: "v4_s1_open", voiceId: VOICE_IDS.sarah },
    { text: "Uff, ok... friday night panic. who watches the kids?", filename: "v4_s2_pain", voiceId: VOICE_IDS.sarah },
    { text: "So I just... describe it. parents waste hours finding a sitter.", filename: "v4_s3_input", voiceId: VOICE_IDS.sarah },
    { text: "It's scanning reddit. actual complaints.", filename: "v4_s4_wait_s", voiceId: VOICE_IDS.sarah },
    { text: "Eighty-one. This is real.", filename: "v4_s5_blue_s", voiceId: VOICE_IDS.sarah },
    { text: "Verdict: build. Your team enters now.", filename: "v4_s6_t1", voiceId: VOICE_IDS.sarah },
    { text: "No one is doing this locally.", filename: "v4_s7_market", voiceId: VOICE_IDS.sarah },
    { text: "I can send this today.", filename: "v4_s8_cmo", voiceId: VOICE_IDS.sarah },
    { text: "I don't know how to code. I can do this.", filename: "v4_s9_cto", voiceId: VOICE_IDS.sarah },
    { text: "I know exactly what to do tomorrow.", filename: "v4_s11_road", voiceId: VOICE_IDS.sarah },
    { text: "When the time comes to talk to investors, you're ready.", filename: "v4_s12_t3", voiceId: VOICE_IDS.sarah },
    { text: "Eight documents. I didn't write a single one.", filename: "v4_s13_data", voiceId: VOICE_IDS.sarah },
    { text: "From a friday panic. A real startup.", filename: "v4_s14_out", voiceId: VOICE_IDS.sarah },
    { text: "It's real. We have a clear path.", filename: "v4_s15_stat", voiceId: VOICE_IDS.sarah },
    { text: "From idea...", filename: "v4_s16_hook_s", voiceId: VOICE_IDS.sarah },
    { text: "Painstack. Build the future today.", filename: "v4_s17_close", voiceId: VOICE_IDS.sarah }
  ];
  for (const script of scripts) await generateAudio(script.text, script.filename, script.voiceId);
}
main().catch(console.error);
