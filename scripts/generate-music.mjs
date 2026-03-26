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

async function generateMusic() {
  console.log("🎵 Generating cinematic-ambient music (90s) via Fetch...");
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-audio/sound-effects", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Minimalist, cinematic, low-beat ambient startup background music. Sleek, premium, inspiring, slightly emotional, atmospheric.",
        duration_seconds: 90, // Note: Sound effects API might have limits, but let's try.
        prompt_influence: 0.3,
      }),
    });

    // Wait! ElevenLabs has a dedicated /v1/music endpoint too, but it might be restricted.
    // Let's check the skill again. It says /v1/music.

    const musicResponse = await fetch("https://api.elevenlabs.io/v1/music", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Minimalist, cinematic, low-beat ambient startup background music. Sleek, premium, inspiring, slightly emotional, atmospheric.",
        music_length_ms: 30000,
      }),
    });

    if (!musicResponse.ok) {
      const error = await musicResponse.text();
      throw new Error(`ElevenLabs Music error: ${error}`);
    }

    const buffer = await musicResponse.arrayBuffer();
    const outputPath = path.join(ROOT, "public", "audio", "cinematic-ambient.mp3");
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log(`   ✓ Saved to public/audio/cinematic-ambient.mp3`);
  } catch (error) {
    console.error("   ❌ Error generating music:", error.message);
  }
}

generateMusic();
