/**
 * Launch Week — Video 5: Reddit → Blueprint (Day 5)
 * 840 frames @ 30fps (~28s), 9:16 canvas
 */

import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  CTACard,
} from './lwComponents';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { lwColors } from './lwBrand';
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';

export const LWReddit: React.FC = () => {

  return (
    <AbsoluteFill style={{ backgroundColor: lwColors.bg }}>
      {/* ── Persistent background ── */}
      <BG />

      {/* ── Audio ── */}
      <SceneAudio filename="lw_v5_reddit" />
      <BackgroundMusic volume={0.05} />

      {/* ──────────────────────────────────────────
          Scene 1 (0–120): Intro
      ────────────────────────────────────────── */}
      <Sequence durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        <ProgressDots index={5} />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <IntroWord startFrame={0} />
          <FeatureTitle
            text="Reddit → Blueprint"
            accentWord="Blueprint"
            gradient="reddit"
            startFrame={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 2 (120–360): Dashboard Input with typing (real screen)
      ────────────────────────────────────────── */}
      <Sequence from={120} durationInFrames={240}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Sequence from={20}>
          <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
        <Sequence from={140}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.4} />
        </Sequence>
        <DashboardInputScene
          theme="dark"
          withInteractions
          customText="reddit.com/r/startups/comments/abc123 — 'I spent $40k building something nobody wanted...'"
        />
        {/* Caption: "Paste any Reddit thread URL into Painstack." */}
        <Caption
          text="Paste any Reddit thread URL into Painstack."
          startFrame={10}
          endFrame={230}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 3 (360–720): Blueprint Score result (real screen)
      ────────────────────────────────────────── */}
      <Sequence from={360} durationInFrames={360}>
        <Audio src={staticFile('audio/sfx_sweep.mp3')} volume={0.25} />
        <Sequence from={15}>
          <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={90}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
        <BlueprintScoreScene theme="dark" targetScore={82} />
        {/* Caption 1: "Problem analysis. Market sizing. Competitors. MVP. Roadmap." */}
        <Caption
          text="Problem analysis. Market sizing. Competitors. MVP. Roadmap."
          startFrame={10}
          endFrame={175}
        />
        {/* Caption 2: "Thread → validated blueprint. ~30 seconds." */}
        <Caption
          text="Thread → validated blueprint. ~30 seconds."
          startFrame={180}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 4 (720–840): CTA Card
      ────────────────────────────────────────── */}
      <Sequence from={720} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        <CTACard
          tagline="Try it on the latest thread in your niche."
          startFrame={10}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
