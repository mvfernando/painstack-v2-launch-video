# 🚀 Painstack AI — Cinematic Launch Kit

Painstack AI is a market validation engine that transforms raw ideas into evidence-backed product blueprints. This repository contains the professional video launch kit, built with **Remotion**, **React**, and **ElevenLabs AI**.

> [!IMPORTANT]
> This project uses a "Master Producer" design system with unified particles, cinematic vignettes, and physics-based UI animations.

---

## 🎬 The Launch Suite

We've developed three distinct video compositions tailored for a high-impact product launch:

1.  **Video 1: Social Master (16:9)** — The high-energy engagement "hook" for X and LinkedIn.
2.  **Video 2: Walkthrough (16:9)** — A deep-dive product demo featuring the "AI Executive Team."
3.  **Video 3: Vertical Shorts (9:16)** — Mobile-first content with high-intensity "popcorn" effects for Reels and TikTok.

---

## 🛠️ Tech Stack

- **Engine**: [Remotion](https://www.remotion.dev/) (Video as Code)
- **UI Architecture**: React + Tailwind CSS
- **Voiceover**: ElevenLabs Multilingual V2 (Adam Voice)
- **SFX**: ElevenLabs Sound Effects API
- **Design**: "Dark Slate" Blueprint System (Inter Font)

---

## ⚙️ Setup & Installation

### 1. Requirements
Ensure you have Node.js installed and an ElevenLabs API key.

### 2. Environment
Create a `.env` file in the root:
```bash
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

### 3. Install Dependencies
```bash
npm install
```

---

## 🤖 AI Audio Workflow

This project automates audio production for frame-perfect synchronization.

### Generate Voiceovers
Generates 20 distinct voiceover files for all 3 videos:
```bash
node scripts/generate-voiceover.mjs --video all
```

### Generate Sound Effects
Generates UI pops, glitches, and atmospheric cinematic sounds:
```bash
node scripts/generate-sfx.mjs
```

---

## 🏗️ Rendering Masters

To export the final videos in high-resolution (CRF 16) for posting:

| Composition | Target Platform | Command |
| :--- | :--- | :--- |
| **Social** | X, LinkedIn | `npx remotion render PainstackV2-Social out/social.mp4` |
| **Walkthrough** | YouTube, Docs | `npx remotion render PainstackV2-Walkthrough out/walkthrough.mp4` |
| **Shorts** | TikTok, Reels | `npx remotion render PainstackV2-Shorts out/shorts.mp4` |

*Add `--concurrency 8 --crf 16` to the commands for maximum performance and quality.*

---

## 📁 Project Structure

- `src/shared/`: Brand tokens, `SceneAudio` helper, and shared UI screens (Blueprint Score).
- `src/compositions/`: Unique logic for each of the 3 videos.
- `public/audio/`: Master library of AI-generated assets.
- `scripts/`: Automation tools for the AI audio pipeline.

---

## 💎 Design Standards

- **Typography**: Inter (Extra Bold / 900 for headlines).
- **Colors**: 
  - Brand Blue: `#2d81e0`
  - Pain Orange: `#ff4500`
  - Success Green: `#10b981`
  - Deep BG: `#0f172a`

---

Built with ⚡ by the Painstack Team.
