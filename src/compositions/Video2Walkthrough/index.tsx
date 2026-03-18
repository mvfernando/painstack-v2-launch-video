
import React from 'react';
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring 
} from 'remotion';
import { colors, fonts } from '../../shared/brand';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';

// Shared Screens
import { ScreenDashboard } from '../shared/screens/ScreenDashboard';
import { ScreenEvidence } from '../shared/screens/ScreenEvidence';
import { ScreenBlueprintScore } from '../shared/screens/ScreenBlueprintScore';
import { ScreenRoadmap } from '../shared/screens/ScreenRoadmap';
import { ScreenDataroom } from '../shared/screens/ScreenDataroom';

// --- Components ---

const FadeSlide: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ 
  delay = 0, 
  children, 
  style 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = spring({ 
    frame: frame - delay, 
    fps, 
    config: { damping: 20, stiffness: 60 } 
  });
  
  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const y = interpolate(spr, [0, 1], [20, 0]);

  return (
    <div style={{ 
      opacity, 
      transform: `translateY(${y}px)`, 
      ...style 
    }}>
      {children}
    </div>
  );
};

const SceneContainer: React.FC<{ children: React.ReactNode; bg?: string }> = ({ 
  children, 
  bg = colors.bg 
}) => (
  <AbsoluteFill style={{ 
    background: bg, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    {children}
  </AbsoluteFill>
);

// --- Individual Scenes ---

const SceneA = () => (
  <SceneContainer>
    <FadeSlide style={{ textAlign: 'center' }}>
      <h1 style={{ 
        fontFamily: fonts.base, 
        fontSize: 90, 
        color: colors.white, 
        fontWeight: 800,
        letterSpacing: '-2px',
        marginBottom: 10
      }}>
        From idea to <span style={{ color: colors.blue }}>launched</span>.
      </h1>
      <p style={{ 
        fontFamily: fonts.base, 
        fontSize: 42, 
        color: colors.muted,
        fontWeight: 300,
        margin: 0
      }}>
        Your AI team, from day zero.
      </p>
    </FadeSlide>
  </SceneContainer>
);

const SceneB = () => (
  <SceneContainer>
    <FadeSlide style={{ textAlign: 'center' }}>
      <h2 style={{ 
        fontFamily: fonts.base, 
        fontSize: 120, 
        color: colors.orange, 
        fontWeight: 800,
        marginBottom: 30
      }}>
        90% Fail.
      </h2>
      <div style={{ 
        fontFamily: fonts.base, 
        fontSize: 48, 
        color: colors.white,
        maxWidth: 900,
        lineHeight: 1.4,
        fontWeight: 400
      }}>
        They built something<br/>
        <span style={{ color: colors.muted }}>nobody actually wanted.</span>
      </div>
    </FadeSlide>
  </SceneContainer>
);

const SceneG = () => (
  <SceneContainer bg={`radial-gradient(circle at 50% 50%, ${colors.blue}22 0%, ${colors.bg} 100%)`}>
    <FadeSlide style={{ textAlign: 'center' }}>
      <h2 style={{ 
        fontFamily: fonts.base, 
        fontSize: 100, 
        color: colors.white, 
        fontWeight: 800,
        letterSpacing: '-3px',
        marginBottom: 10
      }}>
        Painstack.ai
      </h2>
      <p style={{ 
        fontFamily: fonts.base, 
        fontSize: 48, 
        color: colors.blue,
        fontWeight: 600,
        margin: 0
      }}>
        Start building for real.
      </p>
    </FadeSlide>
  </SceneContainer>
);

const SceneE = () => (
  <SceneContainer>
    <FadeSlide style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: 40, marginBottom: 50 }}>
        {['Evidence', 'Market', 'Blueprint', 'Build'].map((label, i) => (
          <FadeSlide key={label} delay={i * 10} style={{ 
            background: colors.bgCard, 
            padding: '20px 40px', 
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            color: colors.blue,
            fontSize: 32,
            fontWeight: 600,
            fontFamily: fonts.base
          }}>
            {label}
          </FadeSlide>
        ))}
      </div>
      <div style={{ fontSize: 48, color: colors.white, fontFamily: fonts.base }}>
        Four Agents. 24/7.
      </div>
    </FadeSlide>
  </SceneContainer>
);

// --- Walkthrough Composition ---

export const Video2Walkthrough: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundMusic volume={0.06} />

      {/* Hero (0-120) */}
      <Sequence durationInFrames={120}>
        <SceneA />
        <SceneAudio filename="v2_sa_hero" />
      </Sequence>

      {/* Problem (120-270) */}
      <Sequence from={120} durationInFrames={150}>
        <SceneB />
        <SceneAudio filename="v2_sb_problem" />
      </Sequence>

      {/* Input (270-420) */}
      <Sequence from={270} durationInFrames={150}>
        <ScreenDashboard />
        <SceneAudio filename="v2_sc_input" />
      </Sequence>

      {/* Evidence (420-600) */}
      <Sequence from={420} durationInFrames={180}>
        <ScreenEvidence />
        <SceneAudio filename="v2_sd_evidence" />
      </Sequence>

      {/* Agents (600-945) */}
      <Sequence from={600} durationInFrames={345}>
        <SceneE />
        <SceneAudio filename="v2_se_agents" />
      </Sequence>

      {/* Blueprint Score (945-1125) */}
      <Sequence from={945} durationInFrames={180}>
        <ScreenBlueprintScore />
        <SceneAudio filename="v2_sf_blueprint" />
      </Sequence>

      {/* Roadmap (1125-1275) */}
      <Sequence from={1125} durationInFrames={150}>
        <ScreenRoadmap />
        {/* Usando o mesmo áudio do Blueprint como backup se blueprint_detail não existe */}
        <SceneAudio filename="v2_sf_blueprint" startFrom={180} />
      </Sequence>

      {/* Dataroom (1275-1425) */}
      <Sequence from={1275} durationInFrames={150}>
        <ScreenDataroom />
        <SceneAudio filename="v2_sf_blueprint" startFrom={330} />
      </Sequence>

      {/* CTA (1425-1575) */}
      <Sequence from={1425} durationInFrames={150}>
        <SceneG />
        <SceneAudio filename="v2_sg_cta" />
      </Sequence>

    </AbsoluteFill>
  );
};
