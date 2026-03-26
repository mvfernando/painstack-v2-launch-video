import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { NeonLine } from '../components/NeonLine';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene06_Transition1: React.FC = () => {
  const frame = useCurrentFrame();
  const { line1, line2, productCaption } = COPY.c06;

  const crossfade = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      <SceneAudio filename="v4_s6_t1" />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#FFFFFF', opacity: interpolate(frame, [0, 15], [0.3, 0]), pointerEvents: 'none' }} />
      <DotGrid opacity={0.2} bgColor="transparent" />

      <NeonLine color="#F97316" shape="horizontal" startFrame={0} durationFrames={35} />

      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%',
      }}>
        <WordReveal text={line1} startFrame={45} staggerFrames={STAGGER_SLOW} fontSize={52} fontWeight={700} color="#F97316" />
        <WordReveal text={line2} startFrame={85} staggerFrames={STAGGER_SLOW} fontSize={40} fontWeight={300} color="#FFFFFF" />
      </div>

      <ProductCaption text={productCaption} startFrame={130} />
    </AbsoluteFill>
  );
};
