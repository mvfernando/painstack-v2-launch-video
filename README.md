# Painstack.ai — Remotion Launch Videos V2

Dois vídeos de lançamento com narração ElevenLabs integrada.

---

## Setup

```bash
npm create video@latest painstack-launch
cd painstack-launch
# Copia este src/ e scripts/ para dentro do projeto
npm install
```

## .env

```
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

Vozes recomendadas: Adam `pNInz6obpgDQGcFmaJgB` (EN, neutro) · Bella `EXAVITQu4vr4xnSDxMaL` (EN, suave)

---

## Gerar áudio

```bash
node --env-file=.env scripts/generate-voiceover.mjs --video all
```

Ficheiros gerados em `public/audio/v1_*.mp3` e `v2_*.mp3`

---

## Preview e Render

```bash
npm run dev
npx remotion render PainstackV2_Social out/v1_social.mp4
npx remotion render PainstackV2_Walkthrough out/v2_walkthrough.mp4
```

---

## Ajustar timing

```tsx
<SceneAudio filename="v1_s2_problem" endAt={140} />   // cortar áudio longo
<SceneAudio filename="v1_s3_input" startFrom={5} />   // atrasar entrada
<SceneAudio filename="v2_sf_blueprint" volume={0.85} /> // ajustar volume
```

---

## Custo ElevenLabs

Scripts dos 2 vídeos: ~1.400 chars. Free tier (10k chars/mês) cobre ~7 renders completos.



# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
