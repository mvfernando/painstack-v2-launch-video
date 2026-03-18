import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene2bBridge } from './scenes/Scene2bBridge';
import { Scene3Input } from './scenes/Scene3Input';
import { Scene4Agents } from './scenes/Scene4Agents';
import { Scene5Verdict } from './scenes/Scene5Verdict';
import { Scene6CTA } from './scenes/Scene6CTA';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { Audio, staticFile } from 'remotion';

// VIDEO 1 — 30s Social Launch
// Total: 1110 frames @ 30fps (~37s)
// Gera áudio com: node scripts/generate-voiceover.mjs --video 1

export const Video1Social: React.FC = () => {
  return (
    <AbsoluteFill>

      <BackgroundMusic volume={0.06} />

      <Sequence durationInFrames={90}>
        <Scene1Hook />
        <SceneAudio filename="v1_s1_hook" />
        <Sequence from={5} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.35} />
        </Sequence>
      </Sequence>

      <Sequence from={90} durationInFrames={210}>
        <Scene2Problem />
        <SceneAudio filename="v1_s2_problem" />
        <Sequence from={130} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_sweep.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      <Sequence from={300} durationInFrames={90}>
        <Scene2bBridge />
        <SceneAudio filename="v1_s2b_bridge" />
        <Sequence from={20} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      <Sequence from={390} durationInFrames={180}>
        <Scene3Input />
        <SceneAudio filename="v1_s3_input" />
      </Sequence>

      <Sequence from={570} durationInFrames={270}>
        <Scene4Agents />
        <SceneAudio filename="v1_s4_agents" />
        <Sequence from={40} durationInFrames={120}>
          <Audio src={staticFile('audio/sfx_data_scan.mp3')} volume={0.25} />
        </Sequence>
      </Sequence>

      <Sequence from={840} durationInFrames={180}>
        <Scene5Verdict />
        <SceneAudio filename="v1_s5_verdict" />
        <Sequence from={110} durationInFrames={40}>
          <Audio src={staticFile('audio/sfx_success.mp3')} volume={0.45} />
        </Sequence>
      </Sequence>

      <Sequence from={1020} durationInFrames={90}>
        <Scene6CTA />
        <SceneAudio filename="v1_s6_cta" />
      </Sequence>

    </AbsoluteFill>
  );
};
