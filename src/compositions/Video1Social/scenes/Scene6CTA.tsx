import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 20, stiffness: 130, mass: 0.8 } });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const taglineOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 20, stiffness: 120, mass: 0.8 } }),
    [0, 1], [20, 0]
  );

  const urlOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });

  // Fade out at the end
  const fadeOut = interpolate(frame, [65, 80], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 28,
      opacity: fadeOut,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.08) 0%, transparent 65%)`,
      }} />

      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        zIndex: 1,
      }}>
        <Img 
          src={staticFile('shared/Painstack.ai_logo2.png')} 
          style={{ width: 300 }} 
        />
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: fonts.base,
        fontSize: 26,
        color: colors.muted,
        fontWeight: 400,
        letterSpacing: '-0.3px',
        opacity: taglineOpacity,
        transform: `translateY(${taglineY}px)`,
        textAlign: 'center',
        zIndex: 1,
      }}>
        From idea to launched product.<br />
        <span style={{ color: colors.white, fontWeight: 600 }}>Your AI team, from day 0.</span>
      </div>

      {/* URL pill */}
      <div style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 100,
        padding: '12px 32px',
        fontFamily: fonts.base,
        fontSize: 18,
        fontWeight: 600,
        color: colors.blue,
        opacity: urlOpacity,
        letterSpacing: '0.01em',
        zIndex: 1,
      }}>
        usepainstackai.com
      </div>

      {/* Bottom badge */}
      <div style={{
        display: 'flex',
        gap: 24,
        opacity: urlOpacity,
        zIndex: 1,
      }}>
        {['Free to start', 'No card required', 'Results in minutes'].map((t) => (
          <div key={t} style={{
            fontFamily: fonts.base,
            fontSize: 13,
            color: colors.muted,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ color: colors.green }}>✓</span> {t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
