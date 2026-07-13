/**
 * Launch Week — Video 2: AI Agents (Day 2)
 * 990 frames @ 30fps (~33s), 9:16 canvas
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
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
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { lwColors } from './lwBrand';

// ── Agent row: BulletItem stacked above a mini UIPlaceholder ──────────────
interface AgentRowProps {
  icon: string;
  text: string;
  placeholderTitle: string;
  rows: number;
  accentColor: string;
  startFrame: number;
}

const AgentRow: React.FC<AgentRowProps> = ({
  icon,
  text,
  placeholderTitle,
  rows,
  accentColor,
  startFrame,
}) => {
  return (
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
      <BulletItem icon={icon} text={text} startFrame={startFrame} />
      <UIPlaceholder
        title={placeholderTitle}
        rows={rows}
        accentColor={accentColor}
        startFrame={startFrame + 10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

export const LWAgents: React.FC = () => {

  return (
    <AbsoluteFill style={{ backgroundColor: lwColors.bg }}>
      {/* ── Persistent background ── */}
      <BG />

      {/* ── Audio ── */}
      <SceneAudio filename="lw_v2_agents" />
      <BackgroundMusic volume={0.05} />

      {/* ──────────────────────────────────────────
          Scene 1 (0–120): Intro
      ────────────────────────────────────────── */}
      <Sequence durationInFrames={120}>
        <ProgressDots index={2} />
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
            text="AI Agents"
            accentWord="Agents"
            gradient="agents"
            startFrame={15}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 2 (120–270): Agents Overview UI
      ────────────────────────────────────────── */}
      <Sequence from={120} durationInFrames={150}>
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
            title="Agents Overview"
            rows={4}
            accentColor="#a78bfa"
          />
        </AbsoluteFill>
        <Caption
          text="A validation score doesn't tell you what to do next."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 3 (270–750): Four agent rows, staggered every 120 frames
      ────────────────────────────────────────── */}

      {/* CEO — frame 270 */}
      <Sequence from={270} durationInFrames={480}>
        <AgentRow
          icon="👔"
          text="CEO — 90-day roadmap & business model"
          placeholderTitle="CEO Roadmap"
          rows={3}
          accentColor="#a78bfa"
          startFrame={0}
        />
      </Sequence>

      {/* CTO — frame 390 */}
      <Sequence from={390} durationInFrames={360}>
        <AgentRow
          icon="💻"
          text="CTO — MVP scope in 12 prompts"
          placeholderTitle="CTO Workspace"
          rows={3}
          accentColor={lwColors.green}
          startFrame={0}
        />
      </Sequence>

      {/* CMO — frame 510 */}
      <Sequence from={510} durationInFrames={240}>
        <AgentRow
          icon="📣"
          text="CMO — ICP, channels, messaging"
          placeholderTitle="CMO Strategy"
          rows={3}
          accentColor={lwColors.orange}
          startFrame={0}
        />
      </Sequence>

      {/* Market — frame 630 */}
      <Sequence from={630} durationInFrames={120}>
        <AgentRow
          icon="📊"
          text="Market — live competitive analysis"
          placeholderTitle="Market Intel"
          rows={3}
          accentColor={lwColors.blue}
          startFrame={0}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 4 (750–870): Summary caption
      ────────────────────────────────────────── */}
      <Sequence from={750} durationInFrames={120}>
        <AbsoluteFill />
        <Caption
          text="One workspace. Four perspectives. Decisions in minutes, not weeks."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 5 (870–990): CTA Card
      ────────────────────────────────────────── */}
      <Sequence from={870} durationInFrames={120}>
        <CTACard
          tagline="Four perspectives. Minutes, not weeks."
          startFrame={10}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
