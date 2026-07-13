/**
 * Launch Week — Video 3: CTO Workspace (Day 3)
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
  Img,
} from 'remotion';
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
import { lwColors, lwFonts } from './lwBrand';
import { Map, BookOpen, ShieldCheck } from 'lucide-react';

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
// Scene 2 (120–270): Code Editor with real Lovable screenshot
// ─────────────────────────────────────────────
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  const entrance = spring({ frame, fps: 30, config: { damping: 18, stiffness: 100 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);

  // Typing simulation for the prompt
  const promptText = "Build a SaaS dashboard for startup validation with real-time market analysis...";
  const charsShown = Math.floor(interpolate(frame, [20, 100], [0, promptText.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isVertical ? '0 60px' : '0 80px',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* macOS-style editor window with glassmorphism */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: lwFonts.base,
            fontSize: isVertical ? 16 : 12,
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
          }}>
            CTO Workspace — Painstack
          </div>
        </div>

        {/* Prompt area */}
        <div style={{
          padding: isVertical ? '28px 24px' : '24px 28px',
          minHeight: isVertical ? 200 : 140,
        }}>
          <div style={{
            fontFamily: lwFonts.base,
            fontSize: isVertical ? 24 : 18,
            color: lwColors.white,
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            {promptText.substring(0, charsShown)}
            <span style={{
              borderRight: `3px solid ${lwColors.green}`,
              marginLeft: 2,
              opacity: frame % 30 < 15 ? 1 : 0,
            }} />
          </div>
        </div>

        {/* Tool screenshot preview */}
        <div style={{
          padding: '0 20px 20px',
        }}>
          <Img
            src={staticFile('images/tools/media__1774625675290.png')}
            style={{
              width: '100%',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />
        </div>
      </div>

      <Caption
        text="Validated idea → blank prompt box."
        startFrame={10}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// Scene 3 (270–660): 12 PRPs styled list
// ─────────────────────────────────────────────
const PRP_LIST = [
  '1. User authentication & onboarding',
  '2. Dashboard layout & navigation',
  '3. Pain point input form',
  '4. Market validation engine',
  '5. Blueprint score calculator',
  '6. Evidence hub integration',
  '7. Competitor analysis module',
  '8. Financial projection model',
  '9. GTM strategy builder',
  '10. Pitch deck generator',
  '11. Security & compliance layer',
  '12. Deployment & CI/CD pipeline',
];

const PRPListItem: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;
  const delay = index * 18;
  const prog = spring({ frame: frame - delay, fps: 30, config: { damping: 18, stiffness: 120 } });
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const x = interpolate(prog, [0, 1], [-15, 0]);

  // Glow effect on entrance
  const glow = interpolate(frame - delay, [0, 15, 45], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const borderColor = `rgba(34,197,94,${interpolate(glow, [0, 1], [0.15, 0.8])})`;
  const shadow = `0 0 ${interpolate(glow, [0, 1], [0, 20])}px rgba(34,197,94,0.4)`;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: isVertical ? '14px 20px' : '10px 16px',
      background: 'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${borderColor}`,
      borderRadius: 12,
      opacity,
      transform: `translateX(${x}px)`,
      boxShadow: shadow,
    }}>
      <div style={{
        width: isVertical ? 10 : 8,
        height: isVertical ? 10 : 8,
        borderRadius: '50%',
        background: lwColors.green,
        flexShrink: 0,
      }} />
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: isVertical ? 22 : 16,
        fontWeight: 600,
        color: lwColors.white,
        lineHeight: 1.3,
      }}>
        {text}
      </div>
    </div>
  );
};

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
        padding: isVertical ? '0 60px' : '0 80px',
      }}
    >
      {/* Title */}
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: isVertical ? 18 : 13,
        fontWeight: 700,
        color: lwColors.green,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: isVertical ? 28 : 20,
        textAlign: 'center',
      }}>
        12 Product Requirement Prompts
      </div>

      {/* PRP list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isVertical ? 10 : 8,
        width: '100%',
      }}>
        {PRP_LIST.map((prp, i) => (
          <PRPListItem key={i} text={prp} index={i} />
        ))}
      </div>

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
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <BulletItem
        icon={<Map size={32} />}
        text="System design included"
        startFrame={5}
        accent="#22c55e"
      />
      <BulletItem
        icon={<BookOpen size={32} />}
        text="Knowledge base ready"
        startFrame={35}
        accent="#22c55e"
      />
      <BulletItem
        icon={<ShieldCheck size={32} />}
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
      <BackgroundMusic volume={0.05} />

      {/* Scene 1 — Intro */}
      <Sequence durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        <Scene1 />
      </Sequence>

      {/* Scene 2 — Editor with typing */}
      <Sequence from={120} durationInFrames={150}>
        <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        <Sequence from={100}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.4} />
        </Sequence>
        <Scene2 />
      </Sequence>

      {/* Scene 3 — 12 PRPs list */}
      <Sequence from={270} durationInFrames={390}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Sequence from={10}>
          <Audio src={staticFile('audio/sfx_data_scan.mp3')} volume={0.2} />
        </Sequence>
        <Scene3 />
      </Sequence>

      {/* Scene 4 — Bullet items */}
      <Sequence from={660} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Sequence from={5}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={35}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={65}>
          <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
        </Sequence>
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
