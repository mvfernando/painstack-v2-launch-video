import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';
import { colors } from '../constants/colors';

export const Scene04_Internet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { thoughts, sources } = COPY.c04;

  // Pulsing brain icon
  const brainScale = 1 + Math.sin(frame / 15) * 0.06;
  const brainOpacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0F' }}>
      {/* Purple-blue glow */}
      <div style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(129,140,248,0.1), rgba(56,189,248,0.08))',
        filter: 'blur(100px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Brain icon pulsing */}
      <div style={{
        position: 'absolute',
        top: '38%', left: '50%',
        transform: `translate(-50%, -50%) scale(${brainScale})`,
        opacity: brainOpacity,
        fontSize: 48,
      }}>
        🧠
      </div>

      {/* Thoughts */}
      <div style={{
        position: 'absolute',
        top: '48%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 10,
      }}>
        {thoughts.map((thought, i) => (
          <WordReveal
            key={i}
            text={thought.text}
            startFrame={20 + i * 35}
            staggerFrames={STAGGER_WORD_SLOW}
            fontSize={thought.size}
            fontWeight={thought.weight}
            color={thought.color ?? '#FFFFFF'}
          />
        ))}
      </div>

      {/* Source pills */}
      <div style={{
        position: 'absolute',
        bottom: 180, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 20,
      }}>
        {sources.map((source, i) => {
          const pillStart = 70 + source.delay;
          const s = spring({
            frame: frame - pillStart,
            fps,
            config: { stiffness: 80, damping: 12, mass: 1 },
          });
          const opacity = interpolate(s, [0, 0.15], [0, 1]);
          const translateY = interpolate(s, [0, 1], [16, 0]);

          // Blinking dot for active pill
          const isActive = frame >= pillStart && frame < pillStart + 60;
          const dotOpacity = isActive ? (frame % 40 < 20 ? 1 : 0.3) : 0.3;

          return (
            <div key={i} style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              backgroundColor: colors.bgSurface,
              border: `1px solid ${colors.borderDefault}`,
              borderRadius: 10,
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: colors.cyan,
                opacity: dotOpacity,
              }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>
                  {source.label}
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>
                  {source.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 100, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 12, color: colors.textMuted,
        fontFamily: 'Inter, sans-serif',
        opacity: interpolate(frame, [120, 140], [0, 0.6], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        }),
      }}>
        This takes 30–60 seconds — real evidence takes time to gather.
      </div>
    </AbsoluteFill>
  );
};
