import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { TypewriterText } from '../components/TypewriterText';
import { ProductConfirm } from '../components/ProductConfirm';
import { COPY } from '../constants/copy';
import { colors } from '../constants/colors';

export const Scene03_Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { label, typewriter, pills, productConfirm } = COPY.c03;

  // Label: opacity 0→1
  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card entrance
  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.82, 1.0]);
  const cardOpacity = interpolate(cardSpring, [0, 0.15], [0, 1]);

  // Typewriter timing — how long it takes
  const typewriterEnd = 20 + Math.ceil(typewriter.length / 2.3);

  // Pills stagger after typewriter
  const pillStarts = pills.map((_, i) => typewriterEnd + 10 + i * 10);

  return (
    <AbsoluteFill>
      <DotGrid />

      {/* Label */}
      <div style={{
        position: 'absolute',
        top: '35%', left: '50%',
        transform: 'translateX(-50%)',
        opacity: labelOpacity,
        fontSize: 14, fontWeight: 400,
        color: colors.textMuted,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.04em',
      }}>
        {label}
      </div>

      {/* Input card */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: `translate(-50%, 0) scale(${cardScale})`,
        opacity: cardOpacity,
        width: 680,
        backgroundColor: colors.bgSurface,
        borderRadius: 14,
        border: `1px solid ${colors.borderDefault}`,
        padding: '28px 32px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      }}>
        <TypewriterText
          text={typewriter}
          startFrame={20}
          charsPerFrame={2.3}
          fontSize={16}
          color="#E2E8F0"
          cursorColor={colors.orange}
        />
      </div>

      {/* Input type pills */}
      <div style={{
        position: 'absolute',
        top: '62%', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 12,
      }}>
        {pills.map((pill, i) => {
          const pOpacity = interpolate(
            frame,
            [pillStarts[i], pillStarts[i] + 12],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          const pY = interpolate(
            frame,
            [pillStarts[i], pillStarts[i] + 16],
            [20, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          return (
            <div key={i} style={{
              opacity: pOpacity,
              transform: `translateY(${pY}px)`,
              border: `1px solid ${colors.borderDefault}`,
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 12,
              color: colors.textSecondary,
              fontFamily: 'Inter, sans-serif',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}>
              {pill}
            </div>
          );
        })}
      </div>

      {/* Product confirm after pills */}
      <ProductConfirm
        text={productConfirm}
        startFrame={pillStarts[pillStarts.length - 1] + 20}
      />
    </AbsoluteFill>
  );
};
