import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const IDEA_TEXT = 'An AI tool that helps founders validate startup ideas using real community data before building anything.';

export const Scene3Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardScale = spring({ frame, fps, config: { damping: 20, stiffness: 150, mass: 0.6 } });
  const cardOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Typing
  const charsToShow = Math.floor(Math.max(0, frame - 15) * 0.85);
  const displayText = IDEA_TEXT.slice(0, charsToShow);
  const showCursor = frame > 20 && charsToShow <= IDEA_TEXT.length;
  const cursorOpacity = Math.round(frame / 12) % 2 === 0 ? 1 : 0;

  // Buttons appear after typing completes
  const typingDone = charsToShow >= IDEA_TEXT.length;
  const buttonProgress = spring({
    frame: frame - (20 + IDEA_TEXT.length / 1.2 + 10),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 }
  });
  const buttonOpacity = typingDone ? interpolate(buttonProgress, [0, 1], [0, 1]) : 0;
  const buttonY = typingDone ? interpolate(buttonProgress, [0, 1], [15, 0]) : 15;

  // Label
  const labelOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 24,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse at 50% 40%, rgba(45,129,224,0.08) 0%, transparent 60%)`,
      }} />

      {/* Label */}
      <div style={{
        fontFamily: fonts.base,
        fontSize: 14,
        fontWeight: 500,
        color: colors.muted,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        opacity: labelOpacity,
        zIndex: 1,
      }}>
        What problem do you want to validate?
      </div>

      {/* Card */}
      <div style={{
        width: 880,
        background: colors.bgCard,
        borderRadius: 20,
        border: `1px solid ${colors.border}`,
        padding: '32px 36px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        zIndex: 1,
      }}>
        {/* Textarea */}
        <div style={{
          fontFamily: fonts.base,
          fontSize: 22,
          color: colors.white,
          lineHeight: 1.6,
          minHeight: 100,
          letterSpacing: '-0.2px',
          marginBottom: 28,
        }}>
          {displayText}
          {showCursor && (
            <span style={{ opacity: cursorOpacity, borderRight: `2px solid ${colors.blue}`, marginLeft: 2 }}>&nbsp;</span>
          )}
          {!displayText && (
            <span style={{ color: colors.muted, fontStyle: 'normal' }}>
              Describe a problem or paste a Reddit link...
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, marginBottom: 20 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: buttonOpacity,
          transform: `translateY(${buttonY}px)`,
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {['📎 Upload', '🔗 Reddit post', '❓ Guide me'].map((label) => (
              <div key={label} style={{
                fontFamily: fonts.base,
                fontSize: 14,
                color: colors.muted,
                padding: '8px 14px',
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                cursor: 'pointer',
              }}>
                {label}
              </div>
            ))}
          </div>

          <div style={{
            background: colors.blue,
            color: colors.white,
            fontFamily: fonts.base,
            fontSize: 16,
            fontWeight: 600,
            padding: '10px 28px',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            letterSpacing: '-0.2px',
          }}>
            Validate →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
