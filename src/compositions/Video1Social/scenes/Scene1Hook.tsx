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
  const word2Opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const subtitleOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Light sweep effect
  const sweepPos = interpolate(frame % 60, [0, 60], [-100, 200]);

  return (
    <AbsoluteFill style={{ background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.08) 0%, transparent 70%)`,
      }} />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 100,
            fontWeight: 900,
            color: colors.white,
            letterSpacing: '-4px',
            opacity: word1Opacity,
            transform: `translateY(${slideY}px)`,
            lineHeight: 1,
          }}>
            Stop guessing.
          </div>
        </div>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 100,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.blue} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-4px',
            opacity: word2Opacity,
            transform: `translateY(${word2Y}px)`,
            lineHeight: 1,
            position: 'relative'
          }}>
            Start building.
            
            {/* Light sweep overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: `${sweepPos}%`,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
                mixBlendMode: 'overlay'
            }} />
          </div>
        </div>
      </div>

      <div style={{
        fontFamily: fonts.base,
        fontSize: 24,
        color: colors.muted,
        fontWeight: 500,
        letterSpacing: '0.1em',
        opacity: subtitleOpacity,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 20
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: colors.orange,
          boxShadow: `0 0 10px ${colors.orange}`,
          animation: 'pulse 1s infinite'
        }} />
        PAINSTACK AI
      </div>
    </AbsoluteFill>
  );
};
