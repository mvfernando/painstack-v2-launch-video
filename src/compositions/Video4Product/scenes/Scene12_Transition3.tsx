import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { NeonLine } from '../components/NeonLine';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';

export const Scene12_Transition3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { thoughts } = COPY.c12;

  // Light→dark crossfade
  const crossfade = interpolate(frame, [0, 8], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      {/* Purple diagonal glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 400,
        background: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(192,132,252,0.08))',
        filter: 'blur(100px)',
        top: '25%', left: '35%',
        transform: 'rotate(-10deg)',
        pointerEvents: 'none',
      }} />

      {/* Light overlay fading out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#F8FAFC',
        opacity: crossfade,
        pointerEvents: 'none',
      }} />

      {/* NeonLine violet */}
      <NeonLine
        color="#818CF8"
        glowColor="rgba(129,140,248,0.6)"
        shape="horizontal"
        startFrame={0}
        durationFrames={30}
      />

      {/* Thoughts */}
      <div style={{
        position: 'absolute',
        top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16,
        width: '80%',
      }}>
        {thoughts.map((thought, i) => {
          const startFrame = i === 0 ? 30 : i === 1 ? 50 : 70;

          // "you're ready." gets special spring treatment
          const isLast = i === thoughts.length - 1;
          const lastScale = isLast
            ? interpolate(
                spring({ frame: frame - 82, fps, config: { stiffness: 80, damping: 12, mass: 1 } }),
                [0, 1], [0.94, 1.0],
              )
            : 1;

          return (
            <div key={i} style={{ transform: `scale(${lastScale})` }}>
              <WordReveal
                text={thought.text}
                startFrame={startFrame}
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
