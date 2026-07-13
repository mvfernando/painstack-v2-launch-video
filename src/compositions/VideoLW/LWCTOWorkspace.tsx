/**
 * Launch Week — Video 3: CTO Workspace (Day 3)
 * 900 frames @ 30fps (~30s)
 */

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
} from 'remotion';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  BulletItem,
  CTACard,
  UIPlaceholder,
} from './lwComponents';
import { SceneAudio } from '../../shared/SceneAudio';

// ─────────────────────────────────────────────
// Scene 1 (0–120): Intro
// ─────────────────────────────────────────────
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <ProgressDots index={3} />
      <IntroWord startFrame={10} />
      <FeatureTitle
        text="CTO Workspace"
        accentWord="Workspace"
        gradient="cto"
        startFrame={20}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 2 (120–270): Blank Editor
// ─────────────────────────────────────────────
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <UIPlaceholder
        title="Blank Editor"
        rows={2}
        accentColor="#22c55e"
        startFrame={0}
      />
      <Caption
        text="Validated idea → blank prompt box."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 3 (270–660): 12 PRPs list
// ─────────────────────────────────────────────
const Scene3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <UIPlaceholder
        title="12 PRPs — Product Requirement Prompts"
        rows={6}
        accentColor="#22c55e"
        startFrame={0}
      />
      <Caption
        text="12 PRPs. Copy. Paste into Lovable, Cursor or Claude."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 4 (660–780): Bullet Items
// ─────────────────────────────────────────────
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        paddingLeft: 140,
        paddingRight: 140,
      }}
    >
      <BulletItem
        icon="🗺️"
        text="System design included"
        startFrame={5}
        accent="#22c55e"
      />
      <BulletItem
        icon="📚"
        text="Knowledge base ready"
        startFrame={35}
        accent="#22c55e"
      />
      <BulletItem
        icon="🔒"
        text="Security checklist"
        startFrame={65}
        accent="#22c55e"
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 5 (780–900): CTA
// ─────────────────────────────────────────────
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      <CTACard
        tagline="Build the right thing, in the right order."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Root Composition
// ─────────────────────────────────────────────
export const LWCTOWorkspace: React.FC = () => {
  return (
    <AbsoluteFill>
      <BG />

      {/* Audio */}
      <SceneAudio filename="lw_v3_cto" />

      {/* Scene 1 */}
      <Sequence durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2 */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2 />
      </Sequence>

      {/* Scene 3 */}
      <Sequence from={270} durationInFrames={390}>
        <Scene3 />
      </Sequence>

      {/* Scene 4 */}
      <Sequence from={660} durationInFrames={120}>
        <Scene4 />
      </Sequence>

      {/* Scene 5 */}
      <Sequence from={780} durationInFrames={120}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
