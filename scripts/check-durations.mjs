import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const AUDIO_DIR = path.join(ROOT, 'public', 'audio');

async function main() {
  const files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
  console.log('--- AUDIO DURATIONS IN SECONDS ---');
  for (const file of files) {
    const filePath = path.join(AUDIO_DIR, file);
    const stats = fs.statSync(filePath);
    // Aproximação baseada em bitrate médio de 128kbps para MP3 do ElevenLabs
    const duration = (stats.size * 8) / (128 * 1024);
    console.log(`${file}: ${duration.toFixed(2)}s (${Math.ceil(duration * 30)} frames)`);
  }
}

main();
