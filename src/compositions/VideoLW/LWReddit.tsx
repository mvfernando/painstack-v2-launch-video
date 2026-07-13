/**
 * Launch Week — Video 5: Reddit → Blueprint (Day 5)
 * 840 frames @ 30fps (~28s), 9:16 canvas
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  CTACard,
  UIPlaceholder,
} from './lwComponents';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { lwColors } from './lwBrand';

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
          Scene 2 (120–360): Paste Reddit URL
      ────────────────────────────────────────── */}
      <Sequence from={120} durationInFrames={240}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            gap: 28,
          }}
        >
          <UIPlaceholder
            title="Paste Reddit URL"
            rows={2}
            accentColor="#ff4500"
          />
          {/* Fake URL input field below the skeleton */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: '16px 24px',
            fontFamily: 'Inter,sans-serif',
            fontSize: 18,
            color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,69,0,0.3)',
            boxSizing: 'border-box',
          }}>
            reddit.com/r/startups/comments/...
          </div>
        </AbsoluteFill>
        {/* Caption: "Paste any Reddit thread URL into Painstack." */}
        <Caption
          text="Paste any Reddit thread URL into Painstack."
          startFrame={10}
          endFrame={230}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 3 (360–720): Your Blueprint (generated)
      ────────────────────────────────────────── */}
      <Sequence from={360} durationInFrames={360}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            gap: 32,
          }}
        >
          <UIPlaceholder
            title="Your Blueprint"
            rows={7}
            accentColor="#ff4500"
          />
        </AbsoluteFill>
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
        <CTACard
          tagline="Try it on the latest thread in your niche."
          startFrame={10}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
