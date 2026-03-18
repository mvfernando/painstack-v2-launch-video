import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const opinions = [
  { text: "Cool idea!", x: 200, y: 300, rotation: -5, delay: 10 },
  { text: "I'd use it", x: 1400, y: 250, rotation: 8, delay: 25 },
  { text: "Maybe later", x: 400, y: 700, rotation: -12, delay: 40 },
  { text: "Nice UI", x: 1500, y: 750, rotation: 5, delay: 55 },
  { text: "Send docs", x: 1200, y: 500, rotation: -3, delay: 70 },
  { text: "Love this", x: 300, y: 500, rotation: 10, delay: 85 },
];

const OpinionCard: React.FC<{ text: string, x: number, y: number, rotation: number, delay: number, frame: number, fps: number }> = ({ text, x, y, rotation, delay, frame, fps }) => {
  const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
  const exitSpr = spring({ frame: frame - 130, fps, config: { damping: 20, stiffness: 40 } });
  
  const opacity = interpolate(frame, [delay, delay + 10, 130, 150], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(spr, [0, 1], [0.5, 1]);
  const exitY = interpolate(exitSpr, [0, 1], [0, 100]);

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `rotate(${rotation}deg) scale(${scale}) translateY(${exitY}px)`,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '16px 32px',
      borderRadius: 16,
      fontFamily: fonts.base,
      color: colors.muted,
      fontSize: 28,
      opacity,
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      zIndex: 0,
    }}>
      "{text}"
    </div>
  );
};

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleDelay = 30;
  const titleSpr = spring({ frame: frame - titleDelay, fps, config: { damping: 20, stiffness: 60 } });
  
  const mainOpacity = interpolate(frame, [0, 10, 190, 210], [0, 1, 1, 0]);
  const chaosOpacity = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: 'clamp' });

  const titleScale = interpolate(titleSpr, [0, 1], [0.95, 1]);
  const titleY = interpolate(titleSpr, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: mainOpacity,
    }}>
      {/* Background radial highlight */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249,100,38,0.1) 0%, transparent 70%)`,
        opacity: chaosOpacity,
      }} />

      {/* Opinion Chaos */}
      {opinions.map((op, i) => (
        <OpinionCard key={i} {...op} frame={frame} fps={fps} />
      ))}

      {/* Main Text Container */}
      <div style={{ 
        textAlign: 'center', 
        zIndex: 1, 
        transform: `scale(${titleScale}) translateY(${titleY}px)` 
      }}>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 80,
          fontWeight: 300,
          color: colors.white,
          letterSpacing: '-2px',
          marginBottom: 10,
        }}>
          Most founders build
        </div>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 110,
          fontWeight: 800,
          color: colors.orange,
          letterSpacing: '-4px',
          textShadow: `0 0 40px ${colors.orange}44`,
          marginBottom: 60,
        }}>
          the wrong thing.
        </div>

        {/* Transition to Solution */}
        <div style={{
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            width: 400,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
          }} />
          <div style={{
            fontFamily: fonts.base,
            fontSize: 42,
            fontWeight: 500,
            color: colors.blue,
            letterSpacing: '0.05em',
          }}>
            PAINSTACK VALIDATES REAL EVIDENCE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
