import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { WordReveal } from '../components/WordReveal';
import { COPY } from '../constants/copy';
import { STAGGER_WORD_SLOW } from '../constants/motion';

export const Scene16_HookFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { lines, punchline } = COPY.c16;

  // Glow intensity ramps up before punchline
  const glowOpacity = interpolate(frame, [0, 200, 225], [0.18, 0.18, 0.38], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Line timings:
  // F0:   line 0 → hold 50f → next at F70
  // F70:  line 1 → hold 50f → next at F140
  // F140: line 2 → hold 50f → silence at F200
  // F225: punchline
  const lineStarts = [0, 70, 140];

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      {/* Pulsing orange glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700,
        borderRadius: '50%',
        background: `rgba(249,115,22,${glowOpacity})`,
        filter: 'blur(120px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
        width: '80%',
      }}>
        {/* 3 setup lines */}
        {lines.map((line, i) => {
          const start = lineStarts[i];
          // When next line enters or punchline enters, fade to opacity_after
          const nextEntry = i < lines.length - 1 ? lineStarts[i + 1] : 225;
          const fadeOut = interpolate(frame, [nextEntry, nextEntry + 15], [1, line.opacity_after], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <div key={i} style={{ opacity: fadeOut }}>
              <WordReveal
                text={line.text}
                startFrame={start}
                staggerFrames={STAGGER_WORD_SLOW}
                fontSize={line.size}
                fontWeight={line.weight}
              />
            </div>
          );
        })}

        {/* Punchline */}
        <div style={{ marginTop: 24 }}>
          <WordReveal
            text={punchline.text}
            startFrame={225}
            staggerFrames={STAGGER_WORD_SLOW}
            fontSize={punchline.size}
            fontWeight={punchline.weight}
            gradient={punchline.gradient}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
