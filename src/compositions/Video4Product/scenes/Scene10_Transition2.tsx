import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { NeonLine } from '../components/NeonLine';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';

export const Scene10_Transition2: React.FC = () => {
  const frame = useCurrentFrame();
  const { thoughts } = COPY.c10;

  // Light→dark crossfade
  const crossfade = interpolate(frame, [0, 8], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      <DotGrid opacity={0.3} bgColor="transparent" />

      {/* Light overlay fading out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#F8FAFC',
        opacity: crossfade,
        pointerEvents: 'none',
      }} />

      {/* NeonLine cyan L-shape */}
      <NeonLine color="#22D3EE" shape="L-right" startFrame={0} durationFrames={27} />

      {/* Thoughts */}
      <div style={{
        position: 'absolute',
        top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
        width: '80%',
      }}>
        {thoughts.map((thought, i) => {
          // "roadmap" pulse on second thought
          const pulseScale = i === 1
            ? interpolate(frame, [95, 105, 120], [1.0, 1.05, 1.0], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              })
            : 1;
          return (
            <div key={i} style={{ transform: `scale(${pulseScale})` }}>
              <WordReveal
                text={thought.text}
                startFrame={i === 0 ? 50 : 90}
                staggerFrames={STAGGER_WORD_SLOW}
                fontSize={thought.size}
                fontWeight={thought.weight}
                color={thought.color}
                gradient={thought.gradient}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
