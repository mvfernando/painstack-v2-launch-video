import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';

export const Scene02_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const { thoughts } = COPY.c02;

  // Calculate cumulative start frames for each thought
  // Each thought: enter time + word reveal time + hold pause
  const thoughtTimings: { start: number; end: number }[] = [];
  let cursor = 0;
  for (const thought of thoughts) {
    const wordCount = thought.text.split(' ').length;
    const revealDur = wordCount * STAGGER_WORD_SLOW + 20; // reveal time
    const start = cursor;
    const end = start + revealDur + thought.pause;
    thoughtTimings.push({ start, end });
    cursor = start + revealDur + (thought.pause * 0.5); // overlap slightly
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      {/* Orange glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'rgba(249,115,22,0.18)',
        filter: 'blur(120px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Thoughts sequence */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16,
        width: '80%',
      }}>
        {thoughts.map((thought, i) => {
          const timing = thoughtTimings[i];
          // Previous thoughts fade to 0.4 when next thought enters
          // Last one stands alone at full
          const nextStart = i < thoughts.length - 1 ? thoughtTimings[i + 1].start : timing.end + 999;
          const fadeToMuted = i < thoughts.length - 1
            ? interpolate(frame, [nextStart, nextStart + 20], [1, 0.4], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              })
            : 1;
          // For "a better way." — all previous go to 0.15
          const isLast = i === thoughts.length - 1;
          const lastStart = thoughtTimings[thoughts.length - 1].start;
          const fadeForLast = !isLast
            ? interpolate(frame, [lastStart, lastStart + 20], [fadeToMuted, 0.15], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              })
            : fadeToMuted;

          return (
            <div key={i} style={{ opacity: fadeForLast }}>
              <WordReveal
                text={thought.text}
                startFrame={timing.start}
                staggerFrames={STAGGER_WORD_SLOW}
                fontSize={thought.size}
                fontWeight={thought.weight}
                gradient={thought.gradient}
                italic={thought.italic}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
