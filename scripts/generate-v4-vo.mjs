import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Try the sk_b058 key first as it might have quota
const API_KEY = 'sk_b0583fb0f9722879db20152d8a17a70b29b0c97ae03c37c0';

// Using STANDARD PRE-MADE VOICES for maximum compatibility/quota stability
const VOICE_IDS = {
  sarah: "EXAVITQu4vr4xnSDxMaL", // Domi (Standard) - Good for Sarah
  narrator: "pNInz6obpgDQGcFmaJgB" // Adam (Standard) - For the Narrator/Man
};

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAudio(text, filename, voiceId) {
  console.log(`Generating ${filename}...`);
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
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        use_speaker_boost: true
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error generating ${filename}: ${response.status} ${response.statusText}`, errorText);
    return;
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR, `${filename}.mp3`), Buffer.from(buffer));
  console.log(`Saved ${filename}.mp3`);
}

async function main() {
  const scripts = [
    // Scene 2: Intro
    { text: "Uff... Respirar. Okay. Vamos lá.", filename: "v4_s2_pain", voiceId: VOICE_IDS.sarah },
    
    // Scene 3: Input
    { text: "Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute.", filename: "v4_s3_input", voiceId: VOICE_IDS.sarah },
    
    // Scene 4: Wait
    { text: "Searching Reddit, Hacker News & web...", filename: "v4_s4_wait_s", voiceId: VOICE_IDS.sarah },
    { text: "Analyzing evidence signals...", filename: "v4_s4_wait_p", voiceId: VOICE_IDS.sarah },
    
    // Scenes 6-12: Analysis
    { text: "Pain Point: Reliable, on-demand childcare is still unsolved in urban areas.", filename: "v4_s6_analysis", voiceId: VOICE_IDS.sarah },
    { text: "Market size: 2.1 billion dollars in the local segment.", filename: "v4_s7_analysis", voiceId: VOICE_IDS.sarah },
    { text: "User Feedback: It’s not about the price, it’s about the peace of mind.", filename: "v4_s8_analysis", voiceId: VOICE_IDS.sarah },
    { text: "Acquisition: Local community partnerships and parent-led referral loops.", filename: "v4_s9_analysis", voiceId: VOICE_IDS.sarah },
    { text: "Competitive Edge: Vetting through network trust, not just background checks.", filename: "v4_s10_analysis", voiceId: VOICE_IDS.sarah },
    { text: "Monetization: Per-booking fee with a premium safety subscription.", filename: "v4_s11_analysis", voiceId: VOICE_IDS.sarah },
    { text: "Conclusion: High confidence score. 87 percent match with market urgency.", filename: "v4_s12_analysis", voiceId: VOICE_IDS.sarah },
    
    // Scene 13: Dataroom
    { text: "Wait... it actually built everything? The entire data room. Analysis, business plan, and even the go-to-market strategy.", filename: "v4_s13_dataroom", voiceId: VOICE_IDS.sarah },
    
    // Scene 14: Finish/Outro
    { text: "Painstack. From zero to launch. Build the future today.", filename: "v4_s14_outro", voiceId: VOICE_IDS.narrator }
  ];

  for (const script of scripts) {
    await generateAudio(script.text, script.filename, script.id || script.voiceId);
  }
}

main().catch(console.error);
