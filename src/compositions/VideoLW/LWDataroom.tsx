/**
 * Launch Week — Video 4: Dataroom (Day 4)
 * 900 frames @ 30fps (~30s)
 */

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  CTACard,
  UIPlaceholder,
} from './lwComponents';
import { SceneAudio } from '../../shared/SceneAudio';
import { lwColors, lwFonts } from './lwBrand';

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
      <ProgressDots index={4} />
      <IntroWord startFrame={10} />
      <FeatureTitle
        text="Dataroom"
        accentWord="Dataroom"
        gradient="dataroom"
        startFrame={20}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 2 (120–300): Generating documents
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
        title="Generating documents..."
        rows={3}
        accentColor="#f96426"
        startFrame={0}
      />
      <Caption
        text="8 investor-ready documents from your blueprint."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Document Tile — animated entrance per tile
// ─────────────────────────────────────────────
const DOCS = [
  '📊 Pitch Deck',
  '📄 One-Pager',
  '📝 Executive Summary',
  '💰 Financial Model',
  '🌍 Market Analysis',
  '⚔️ Competitor Matrix',
  '⚠️ Risk Register',
  '❓ FAQ',
];

interface DocTileProps {
  label: string;
  tileIndex: number;
}

const DocTile: React.FC<DocTileProps> = ({ label, tileIndex }) => {
  const frame = useCurrentFrame();
  // Each tile's start relative to the Sequence (Scene 3 starts at absolute 300)
  const tileStartFrame = tileIndex * 45;
  const prog = spring({
    frame: frame - tileStartFrame,
    fps: 30,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(prog, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(prog, [0, 1], [0.88, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(prog, [0, 1], [18, 0], { extrapolateRight: 'clamp' });

  // Split emoji from label text
  const parts = label.split(' ');
  const emoji = parts[0];
  const name = parts.slice(1).join(' ');

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        minHeight: 90,
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: 28 }}>{emoji}</div>
      <div
        style={{
          fontFamily: lwFonts.base,
          fontSize: 18,
          fontWeight: 700,
          color: lwColors.white,
          lineHeight: 1.3,
          letterSpacing: '-0.3px',
        }}
      >
        {name}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Scene 3 (300–660): Animated document grid
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          width: '100%',
          maxWidth: 900,
        }}
      >
        {DOCS.map((doc, i) => (
          <DocTile key={doc} label={doc} tileIndex={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 4 (660–780): Caption beat
// ─────────────────────────────────────────────
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Caption
        text="Grounded in your blueprint. Not templates."
        startFrame={10}
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
        tagline="8 documents. One blueprint."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Root Composition
// ─────────────────────────────────────────────
export const LWDataroom: React.FC = () => {
  return (
    <AbsoluteFill>
      <BG />

      {/* Audio */}
      <SceneAudio filename="lw_v4_dataroom" />

      {/* Scene 1 */}
      <Sequence durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2 */}
      <Sequence from={120} durationInFrames={180}>
        <Scene2 />
      </Sequence>

      {/* Scene 3 */}
      <Sequence from={300} durationInFrames={360}>
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
