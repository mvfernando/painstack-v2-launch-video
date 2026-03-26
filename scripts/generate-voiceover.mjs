#!/usr/bin/env node
// scripts/generate-voiceover.mjs
// Corre este script UMA VEZ para gerar os ficheiros de áudio
// Depois os ficheiros ficam em public/audio/ e são usados pelo Remotion

// Usage:
//   node scripts/generate-voiceover.mjs --video 1
//   node scripts/generate-voiceover.mjs --video 2
//   node scripts/generate-voiceover.mjs --video all

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

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// Recomendado: "Liam" (en) — voz masculina, clara, autoritária
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'TX3LPaxL7no93ppTy6fJ'; // Liam

const MODEL_ID = 'eleven_multilingual_v2'; // suporta PT e EN

const VOICE_SETTINGS = {
  stability: 0.55,        // menos robótico, mais natural
  similarity_boost: 0.80,
  style: 0.20,            // ligeiro estilo sem exagero
  use_speaker_boost: true,
};
// ─────────────────────────────────────────────────────────────────────────────

if (!ELEVENLABS_API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY não definida.\n   Corre: export ELEVENLABS_API_KEY=your_key');
  process.exit(1);
}

const VIDEO1_SCRIPTS = [
  { id: 'v1_s1_hook', text: '90% of startups fail. Stop guessing. Start building.' },
  { id: 'v1_s2_problem', text: "Founders waste years building what nobody wants. Not because they're lazy. Because they validated with opinions instead of evidence." },
  { id: 'v1_s2b_bridge', text: "We find the pain signals you're missing. Painstack scans real communities for real evidence." },
  { id: 'v1_s3_input', text: "With Painstack, you describe your idea or paste a Reddit link. That's it." },
  { id: 'v1_s4_agents', text: "Four AI agents find where people are screaming for help — in real communities and real conversations." },
  { id: 'v1_s5_verdict', text: "Data-backed verdict: Build with confidence. Or don't." },
  { id: 'v1_s6_cta', text: 'Painstack AI. Free to start. No card required.' },
];

const VIDEO2_SCRIPTS = [
  { id: 'v2_sa_hero', text: "Stop launching products nobody wants. From idea to evidence-backed product. Your AI team, from day zero." },
  { id: 'v2_sb_problem', text: "Ninety percent of startups fail. The number one reason? They built a solution for a problem that didn't exist. Painstack fixes your starting point." },
  { id: 'v2_sc_input', text: "Start with a raw idea or a hunch. Describe it, paste a Reddit thread, or upload your research. Our agents take it from there." },
  { id: 'v2_sd_evidence', text: "The Evidence Hub scans thousands of conversations for real pain signals. We don't use surveys. we find actual people screaming for help in real communities." },
  { id: 'v2_se_agents', text: "Your AI Executive Team: AI CTO, AI CEO, AI CMO, and Market Agent. Four co-founders working your blueprint. Simultaneously." },
  { id: 'v2_sf_blueprint', text: "The result? A Startup Blueprint. You get a clear go or no-go score, three viable solution directions, and a validated roadmap to your MVP." },
  { id: 'v2_sh_dataroom', text: "Finally, everything is organized in your dedicated Dataroom. From market analysis to technical architecture, you're ready to build or pitch." },
  { id: 'v2_sg_cta', text: "Real problems. Real data. Clear decisions. Painstack AI. Build with confidence." },
];

const VIDEO3_SCRIPTS = [
  { id: 'v3_s1_hook', text: 'You have an idea. Is it worth building?' },
  { id: 'v3_s2_problem', text: "Ninety percent of startups fail. Number one reason? Wrong product." },
  { id: 'v3_s3_solution', text: "Painstack scans reddit, hacker news, and product hunt for real help signals." },
  { id: 'v3_s4_result', text: "Score 87 out of 100. Build with confidence." },
  { id: 'v3_s5_cta', text: 'Painstack AI. Start building for real today.' },
];

async function generateAudio(id, text) {
  const outputDir = path.join(ROOT, 'public', 'audio');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${id}.mp3`);

  if (fs.existsSync(outputPath)) {
    console.log(`⏭  Já existe: ${id}.mp3`);
    return outputPath;
  }

  console.log(`🎙  Gerando: ${id}`);
  console.log(`   "${text.slice(0, 60)}..."`);

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
    throw new Error(`ElevenLabs API error (${response.status}): ${error}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`   ✓ Guardado: public/audio/${id}.mp3`);

  // Pequena pausa para não bater nos rate limits
  await new Promise(r => setTimeout(r, 500));

  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);
  const videoArg = args[args.indexOf('--video') + 1] || 'all';

  let scripts = [];
  if (videoArg === '1') scripts = VIDEO1_SCRIPTS;
  else if (videoArg === '2') scripts = VIDEO2_SCRIPTS;
  else if (videoArg === '3') scripts = VIDEO3_SCRIPTS;
  else scripts = [...VIDEO1_SCRIPTS, ...VIDEO2_SCRIPTS, ...VIDEO3_SCRIPTS];

  console.log(`\n🚀 Painstack Voiceover Generator`);
  console.log(`   Vídeo: ${videoArg} | Scripts: ${scripts.length} | Voice: ${VOICE_ID}\n`);

  let success = 0;
  let failed = 0;

  for (const script of scripts) {
    try {
      await generateAudio(script.id, script.text);
      success++;
    } catch (err) {
      console.error(`   ❌ Erro em ${script.id}:`, err.message);
      failed++;
    }
  }

  console.log(`\n✅ Concluído: ${success} ficheiros gerados, ${failed} erros`);
  console.log(`   Ficheiros em: public/audio/\n`);
}

main();
