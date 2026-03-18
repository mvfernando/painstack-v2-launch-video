import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({ frame, fps, config: { damping: 18, stiffness: 100, mass: 1 } });
  const slideY = interpolate(lineProgress, [0, 1], [60, 0]);

  const word1Opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const word2Progress = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100, mass: 1 } });
  const word2Y = interpolate(word2Progress, [0, 1], [60, 0]);
  const word2Opacity = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const subtitleOpacity = interpolate(frame, [28, 45], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Dot blinking
  const dotOpacity = Math.round(frame / 15) % 2 === 0 ? 1 : 0.3;

  return (
    <AbsoluteFill style={{ background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.06) 0%, transparent 70%)`,
      }} />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 96,
            fontWeight: 800,
            color: colors.white,
            letterSpacing: '-3px',
            opacity: word1Opacity,
            transform: `translateY(${slideY}px)`,
            lineHeight: 1.05,
          }}>
            Stop guessing.
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 96,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.blue} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-3px',
            opacity: word2Opacity,
            transform: `translateY(${word2Y}px)`,
            lineHeight: 1.05,
          }}>
            Start building.
          </div>
        </div>
      </div>

      <div style={{
        fontFamily: fonts.base,
        fontSize: 22,
        color: colors.muted,
        fontWeight: 400,
        letterSpacing: '0.01em',
        opacity: subtitleOpacity,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: colors.orange,
          opacity: dotOpacity,
        }} />
        Painstack.ai — V2
      </div>
    </AbsoluteFill>
  );
};
