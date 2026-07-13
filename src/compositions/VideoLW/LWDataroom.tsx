/**
 * Launch Week — Video 4: Dataroom (Day 4)
 * 900 frames @ 30fps (~30s)
 */

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import {
  Presentation,
  FileText,
  FileSearch,
  LineChart,
  Globe,
  Crosshair,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import {
  BG,
  ProgressDots,
  IntroWord,
  FeatureTitle,
  Caption,
  CTACard,
} from './lwComponents';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { lwColors, lwFonts } from './lwBrand';
import { DataRoomScene } from '../shared/screens/ScreenDataroom';

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
// Scene 2 (120–300): Real DataRoom screen
// ─────────────────────────────────────────────
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill>
      <DataRoomScene />
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
  { icon: <Presentation />, label: 'Pitch Deck' },
  { icon: <FileText />, label: 'One-Pager' },
  { icon: <FileSearch />, label: 'Executive Summary' },
  { icon: <LineChart />, label: 'Financial Model' },
  { icon: <Globe />, label: 'Market Analysis' },
  { icon: <Crosshair />, label: 'Competitor Matrix' },
  { icon: <AlertTriangle />, label: 'Risk Register' },
  { icon: <HelpCircle />, label: 'FAQ' },
];

interface DocTileProps {
  icon: React.ReactNode;
  label: string;
  tileIndex: number;
}

const DocTile: React.FC<DocTileProps> = ({ icon, label, tileIndex }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;
  // Each tile's start relative to the Sequence (Scene 3 starts at absolute 300)
  const tileStartFrame = tileIndex * 30;
  const prog = spring({
    frame: frame - tileStartFrame,
    fps: 30,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(prog, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(prog, [0, 1], [0.88, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(prog, [0, 1], [18, 0], { extrapolateRight: 'clamp' });

  // Floating effect
  const float = interpolate(
    Math.sin((frame - tileStartFrame) / 20),
    [-1, 1],
    [-2, 2]
  );

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        borderRadius: isVertical ? 20 : 14,
        padding: isVertical ? '28px' : '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: isVertical ? 14 : 10,
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        minHeight: isVertical ? 120 : 90,
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{ 
        width: isVertical ? 40 : 28,
        height: isVertical ? 40 : 28,
        color: lwColors.white,
        transform: `translateY(${float}px)`,
      }}>
        {React.cloneElement(icon as any, { size: isVertical ? 40 : 28, strokeWidth: 2 })}
      </div>
      <div
        style={{
          fontFamily: lwFonts.base,
          fontSize: isVertical ? 26 : 18,
          fontWeight: 700,
          color: lwColors.white,
          lineHeight: 1.3,
          letterSpacing: '-0.3px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Scene 3 (300–660): Animated document grid
// ─────────────────────────────────────────────
const Scene3: React.FC = () => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: isVertical ? 60 : 80,
        paddingRight: isVertical ? 60 : 80,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: isVertical ? 16 : 20,
          width: '100%',
          maxWidth: 900,
        }}
      >
        {DOCS.map((doc, i) => (
          <DocTile key={doc.label} icon={doc.icon} label={doc.label} tileIndex={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 4 (660–780): Caption beat
// ─────────────────────────────────────────────
const Scene4: React.FC = () => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isVertical ? '0 80px' : '0 100px',
      }}
    >
      {/* Big statement text */}
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: isVertical ? 48 : 40,
        fontWeight: 900,
        color: lwColors.white,
        textAlign: 'center',
        letterSpacing: '-1.5px',
        lineHeight: 1.25,
      }}>
        Grounded in your blueprint.
      </div>
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: isVertical ? 32 : 26,
        fontWeight: 600,
        color: lwColors.introGray,
        textAlign: 'center',
        marginTop: 16,
      }}>
        Not templates.
      </div>
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
      <BackgroundMusic volume={0.05} />

      {/* Scene 1 — Intro */}
      <Sequence durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        <Scene1 />
      </Sequence>

      {/* Scene 2 — Real DataRoom screen */}
      <Sequence from={120} durationInFrames={180}>
        <Audio src={staticFile('audio/sfx_sweep.mp3')} volume={0.3} />
        <Sequence from={20}>
          <Audio src={staticFile('audio/sfx_data_scan.mp3')} volume={0.2} />
        </Sequence>
        <Scene2 />
      </Sequence>

      {/* Scene 3 — Document grid with staggered tiles */}
      <Sequence from={300} durationInFrames={360}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        {/* UI pops for tile entrances */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Sequence key={i} from={i * 30}>
            <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.12} />
          </Sequence>
        ))}
        <Scene3 />
      </Sequence>

      {/* Scene 4 — Statement caption */}
      <Sequence from={660} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Scene4 />
      </Sequence>

      {/* Scene 5 — CTA */}
      <Sequence from={780} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
