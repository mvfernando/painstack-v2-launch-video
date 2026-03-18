import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const Scene2bBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline animation
  const headlineProg = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.8 } });
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const headlineY = interpolate(headlineProg, [0, 1], [30, 0]);

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Pills/Cards data
  const pills = [
    { label: '🔴 Reddit & communities', color: colors.orange, delay: 20 },
    { label: '📊 Market structure', color: colors.blue, delay: 38 },
    { label: '🏗️ Startup Blueprint', color: '#a78bfa', delay: 56 },
  ];

  // Footer text
  const footerOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [75, 90], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 40,
      opacity: fadeOut,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.06) 0%, transparent 70%)`,
      }} />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 48,
          fontWeight: 800,
          color: colors.white,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          marginBottom: 8,
          letterSpacing: '-1.5px',
        }}>
          Painstack scans real communities.
        </div>
        <div style={{
          fontFamily: fonts.base,
          fontSize: 24,
          color: colors.muted,
          fontWeight: 400,
          opacity: subtitleOpacity,
        }}>
          Real evidence. Not guesses.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, zIndex: 1 }}>
        {pills.map((pill, i) => {
          const prog = spring({ frame: frame - pill.delay, fps, config: { damping: 18, stiffness: 130, mass: 0.8 } });
          const opacity = interpolate(frame, [pill.delay, pill.delay + 15], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          const scale = interpolate(prog, [0, 1], [0.8, 1]);

          return (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${pill.color}44`,
              borderRadius: 100,
              padding: '12px 24px',
              fontFamily: fonts.base,
              fontSize: 16,
              fontWeight: 600,
              color: colors.white,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 10px 30px rgba(0,0,0,0.3)`,
            }}>
              {pill.label}
            </div>
          );
        })}
      </div>

      <div style={{
        fontFamily: fonts.base,
        fontSize: 14,
        color: colors.muted,
        opacity: footerOpacity,
        marginTop: 20,
        zIndex: 1,
      }}>
        Validates your idea in seconds ↓
      </div>
    </AbsoluteFill>
  );
};
