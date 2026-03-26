import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { NeonLine } from '../components/NeonLine';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';

export const Scene06_Transition1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { thoughts, agents } = COPY.c06;

  // Light→dark crossfade (first 8f)
  const crossfade = interpolate(frame, [0, 8], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      {/* Light overlay fading out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#F8FAFC',
        opacity: crossfade,
        pointerEvents: 'none',
      }} />

      {/* Diagonal glow */}
      <div style={{
        position: 'absolute',
        width: 800, height: 400,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(129,140,248,0.1))',
        filter: 'blur(100px)',
        top: '20%', left: '30%',
        transform: 'rotate(-15deg)',
        pointerEvents: 'none',
      }} />

      {/* NeonLine horizontal */}
      <NeonLine color="#F97316" shape="horizontal" startFrame={0} durationFrames={36} />

      {/* Thoughts */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
        width: '80%',
      }}>
        {thoughts.map((thought, i) => (
          <WordReveal
            key={i}
            text={thought.text}
            startFrame={i === 0 ? 40 : 105}
            staggerFrames={STAGGER_WORD_SLOW}
            fontSize={thought.size}
            fontWeight={thought.weight}
            color={thought.color}
          />
        ))}
      </div>

      {/* Agent pills */}
      <div style={{
        position: 'absolute',
        bottom: 180, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 16,
      }}>
        {agents.map((agent, i) => {
          const pillStart = 125 + i * 8;
          const s = spring({
            frame: frame - pillStart,
            fps,
            config: { stiffness: 80, damping: 12, mass: 1 },
          });
          const opacity = interpolate(s, [0, 0.15], [0, 1]);
          const translateY = interpolate(s, [0, 1], [20, 0]);
          return (
            <div key={i} style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              border: `1px solid ${agent.border}`,
              borderRadius: 999,
              padding: '10px 20px',
              fontSize: 14, fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}>
              {agent.label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
