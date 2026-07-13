/**
 * Launch Week — Video 2: AI Agents (Day 2)
 * 990 frames @ 30fps (~33s), 9:16 canvas
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
import { ExecutiveTeamScene } from '../shared/screens/ScreenAgents';
import { Briefcase, Code2, Megaphone, LineChart } from 'lucide-react';

// ── Agent focus card — one per scene ─────────────────────────────────────
interface AgentFocusProps {
  icon: React.ReactNode;
  role: string;
  desc: string;
  accent: string;
}

const AgentFocus: React.FC<AgentFocusProps> = ({ icon, role, desc, accent }) => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        gap: 28,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 32,
          background: `${accent}22`,
          border: `2px solid ${accent}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
          boxShadow: `0 0 30px ${accent}33`,
        }}
      >
        {icon}
      </div>
      {/* Role name */}
      <div
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 48,
          fontWeight: 900,
          color: lwColors.white,
          textAlign: 'center',
          letterSpacing: '-1.5px',
          lineHeight: 1.15,
        }}
      >
        {role}
      </div>
      {/* Description */}
      <div
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 28,
          fontWeight: 600,
          color: lwColors.introGray,
          textAlign: 'center',
          lineHeight: 1.45,
          maxWidth: 700,
        }}
      >
        {desc}
      </div>
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
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
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
          Scene 2 (120–270): Executive Team Overview (real screen)
      ────────────────────────────────────────── */}
      <Sequence from={120} durationInFrames={150}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <ExecutiveTeamScene theme="dark" />
        <Caption
          text="A validation score doesn't tell you what to do next."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 3 (270–390): CEO Agent — focus card
      ────────────────────────────────────────── */}
      <Sequence from={270} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.3} />
        <AgentFocus
          icon={<Briefcase size={56} strokeWidth={2.5} />}
          role="CEO Agent"
          desc="90-day roadmap & business model strategy"
          accent="#a78bfa"
        />
        <Caption
          text="CEO — 90-day roadmap & business model."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 4 (390–510): CTO Agent — focus card
      ────────────────────────────────────────── */}
      <Sequence from={390} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.3} />
        <AgentFocus
          icon={<Code2 size={56} strokeWidth={2.5} />}
          role="CTO Agent"
          desc="MVP scope in 12 product requirement prompts"
          accent={lwColors.green}
        />
        <Caption
          text="CTO — MVP scope in 12 prompts."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 5 (510–630): CMO Agent — focus card
      ────────────────────────────────────────── */}
      <Sequence from={510} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.3} />
        <AgentFocus
          icon={<Megaphone size={56} strokeWidth={2.5} />}
          role="CMO Agent"
          desc="ICP definition, channels & messaging strategy"
          accent={lwColors.orange}
        />
        <Caption
          text="CMO — ICP, channels, messaging."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 6 (630–750): Market Agent — focus card
      ────────────────────────────────────────── */}
      <Sequence from={630} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.3} />
        <AgentFocus
          icon={<LineChart size={56} strokeWidth={2.5} />}
          role="Market Agent"
          desc="Live competitive analysis & market intelligence"
          accent={lwColors.blue}
        />
        <Caption
          text="Market — live competitive analysis."
          startFrame={10}
        />
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 7 (750–870): Summary caption
      ────────────────────────────────────────── */}
      <Sequence from={750} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
          }}
        >
          <div
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 48,
              fontWeight: 900,
              color: lwColors.white,
              textAlign: 'center',
              letterSpacing: '-1.5px',
              lineHeight: 1.25,
            }}
          >
            One workspace.{'\n'}Four perspectives.
          </div>
          <div
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 600,
              color: lwColors.introGray,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Decisions in minutes, not weeks.
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ──────────────────────────────────────────
          Scene 8 (870–990): CTA Card
      ────────────────────────────────────────── */}
      <Sequence from={870} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        <CTACard
          tagline="Four perspectives. Minutes, not weeks."
          startFrame={10}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
