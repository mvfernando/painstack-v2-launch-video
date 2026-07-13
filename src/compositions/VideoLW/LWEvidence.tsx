/**
 * Launch Week — Video 1: Evidence Hub (Day 1)
 * 900 frames @ 30fps (~30s), 9:16 canvas
 */

import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  BulletItem,
  CTACard,
} from './lwComponents';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { lwColors } from './lwBrand';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { EvidenceCardsScene } from '../shared/screens/ScreenEvidence';
import { FileText, MessageSquare } from 'lucide-react';

export const LWEvidence: React.FC = () => {

  return (
    <AbsoluteFill style={{ backgroundColor: lwColors.bg }}>
      {/* ── Persistent background ── */}
      <BG />

      {/* ── Audio ── */}
      <SceneAudio filename="lw_v1_evidence" />
      <BackgroundMusic volume={0.05} />

      {/* ──────────────────────────────────────────
          Scene 1 (0–120): Intro
      ────────────────────────────────────────── */}
      <Sequence durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        <ProgressDots index={1} />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            paddingTop: 0,
          }}
        >
          <IntroWord startFrame={0} />
          <FeatureTitle
            text="Evidence Hub"
            accentWord="Hub"
            gradient="hub"
            startFrame={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 2 (120–420): Blueprint Score UI (real screen)
      ────────────────────────────────────────── */}
      <Sequence from={120} durationInFrames={300}>
        <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.2} />
        <BlueprintScoreScene theme="dark" targetScore={87} />
        {/* Caption 1: "A score. Based on what?" — frames 130–280 */}
        <Caption
          text="A score. Based on what?"
          startFrame={10}
          endFrame={160}
        />
        {/* Caption 2: "Evidence Hub shows the work." — from frame 290 */}
        <Caption
          text="Evidence Hub shows the work."
          startFrame={170}
        />
        {/* Success chime when BUILD badge appears (~frame 90 into the scene) */}
        <Sequence from={90}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 3 (420–630): Evidence Sources UI (real screen)
      ────────────────────────────────────────── */}
      <Sequence from={420} durationInFrames={210}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <EvidenceCardsScene />
        {/* UI pops for staggered card entrances */}
        <Sequence from={25}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={55}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.15} />
        </Sequence>
        {/* Caption: "Click each source. Read the original. See the date." */}
        <Caption
          text="Click each source. Read the original. See the date."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 4 (630–780): Bullet Items
      ────────────────────────────────────────── */}
      <Sequence from={630} durationInFrames={150}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '0 80px',
            gap: 36,
          }}
        >
          <BulletItem
            icon={<FileText size={32} />}
            text="Show evidence to investors"
            startFrame={10}
          />
          <BulletItem
            icon={<MessageSquare size={32} />}
            text="DM the people with the problem"
            startFrame={40}
          />
        </AbsoluteFill>
        <Sequence from={10}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={40}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 5 (780–900): CTA Card
      ────────────────────────────────────────── */}
      <Sequence from={780} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        <CTACard
          tagline="The score isn't the product. The evidence is."
          startFrame={10}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
