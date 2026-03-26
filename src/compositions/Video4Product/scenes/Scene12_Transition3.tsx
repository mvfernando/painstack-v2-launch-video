import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { NeonLine } from '../components/NeonLine';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene12_Transition3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { line1, line2, line3, productCaption } = COPY.c12;

  const crossfade = interpolate(frame, [0, 8], [1, 0], { extrapolateLeft: 'clamp' });

  const scaleSpring = spring({ 
    frame: frame - 80, 
    fps, 
    config: { stiffness: 80, damping: 12, mass: 1 } 
  });
  const lastScale = interpolate(scaleSpring, [0, 1], [0.94, 1.0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      <SceneAudio filename="v4_s12_t3" />
      <div style={{ position: 'absolute', width: 700, height: 400, background: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(192,132,252,0.08))', filter: 'blur(100px)', top: '25%', left: '35%', transform: 'rotate(-10deg)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F8FAFC', opacity: crossfade }} />

      <NeonLine color="#818CF8" glowColor="rgba(129,140,248,0.6)" shape="horizontal" startFrame={0} durationFrames={30} />

      <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '80%' }}>
        <WordReveal text={line1} startFrame={30} staggerFrames={STAGGER_SLOW} fontSize={32} fontWeight={300} color="#94A3B8" />
        <WordReveal text={line2} startFrame={55} staggerFrames={STAGGER_SLOW} fontSize={32} fontWeight={300} color="#94A3B8" />
        <div style={{ transform: `scale(${lastScale})` }}>
          <WordReveal text={line3} startFrame={80} staggerFrames={STAGGER_SLOW} fontSize={56} fontWeight={600} color="#FFFFFF" />
        </div>
      </div>

      <ProductCaption text={productCaption} startFrame={140} />
    </AbsoluteFill>
  );
};
