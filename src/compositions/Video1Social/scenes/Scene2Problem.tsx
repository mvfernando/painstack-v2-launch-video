
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const opinions = [
  { text: "Cool idea!", x: 200, y: 300, rotation: -5, delay: 10 },
  { text: "I'd use it", x: 1400, y: 250, rotation: 8, delay: 25 },
  { text: "Maybe later", x: 400, y: 700, rotation: -12, delay: 40 },
  { text: "Nice UI", x: 1560, y: 780, rotation: 5, delay: 55 },
  { text: "Send docs", x: 1550, y: 150, rotation: -3, delay: 70 },
  { text: "Love this", x: 300, y: 500, rotation: 10, delay: 85 },
  { text: "I'd pay for this", x: 1450, y: 450, rotation: -4, delay: 100 },
  { text: "Too niche?", x: 250, y: 150, rotation: 12, delay: 115 },
  { text: "Scaling?", x: 1600, y: 550, rotation: -8, delay: 130 },
  { text: "Nice idea, but...", x: 1400, y: 920, rotation: -6, delay: 145 },
];

const OpinionCard: React.FC<{ text: string, x: number, y: number, rotation: number, delay: number, frame: number, fps: number }> = ({ text, x, y, rotation, delay, frame, fps }) => {
  const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
  const drift = Math.sin((frame - delay) / 20) * 10;
  
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(spr, [0, 1], [0.6, 1]);

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale}) translateY(${drift}px)`,
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${colors.border}`,
      padding: '16px 32px',
      borderRadius: 16,
      fontFamily: fonts.base,
      color: colors.muted,
      fontSize: 28,
      fontWeight: 500,
      opacity,
      boxShadow: '0 15px 45px rgba(0,0,0,0.4)',
      zIndex: 0,
      whiteSpace: 'nowrap'
    }}>
      "{text}"
    </div>
  );
};

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen shake effect on pops
  const shake = opinions.reduce((acc, op) => {
      const s = spring({ frame: frame - op.delay, fps, config: { damping: 10, stiffness: 200 } });
      const pulse = interpolate(s, [0, 0.1, 1], [0, 8, 0]);
      return acc + pulse;
  }, 0);

  const titleDelay = 30;
  const titleSpr = spring({ frame: frame - titleDelay, fps, config: { damping: 20, stiffness: 60 } });
  
  const titleScale = interpolate(titleSpr, [0, 1], [0.9, 1]);
  const titleY = interpolate(titleSpr, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `scale(${1 + (shake/1000)})` // Subtle world scale pulse
    }}>
      {/* Dark moody background with dynamic shake */}
      <AbsoluteFill style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249,100,38,0.15) 0%, transparent 60%)`,
        transform: `translate(${Math.random() * shake}px, ${Math.random() * shake}px)`,
      }} />

      {/* Opinion Chaos */}
      {opinions.map((op, i) => (
        <OpinionCard key={i} {...op} frame={frame} fps={fps} />
      ))}

      {/* Main Text Container */}
      <div style={{ 
        textAlign: 'center', 
        zIndex: 50,
        transform: `translateY(${titleY}px) scale(${titleScale})`,
      }}>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 90,
          fontWeight: 300,
          color: colors.white,
          letterSpacing: '-2px',
          marginBottom: 10,
          textShadow: '0 0 30px rgba(0,0,0,1)'
        }}>
          Most founders build
        </div>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 130,
          fontWeight: 900,
          color: colors.orange,
          letterSpacing: '-6px',
          textShadow: `0 0 60px ${colors.orange}88, 0 0 30px rgba(0,0,0,1)`,
          marginBottom: 80,
          lineHeight: 1
        }}>
          the wrong thing.
        </div>

        {/* Transition Line */}
        <div style={{
          opacity: interpolate(frame, [150, 175], [0, 1], { extrapolateRight: 'clamp' }),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}>
            <div style={{
                width: 500,
                height: 3,
                background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
                boxShadow: `0 0 20px ${colors.blue}`
            }} />
            <div style={{
                fontFamily: fonts.base,
                fontSize: 36,
                fontWeight: 800,
                color: colors.blue,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
            }}>
                Gain market certainty.
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
