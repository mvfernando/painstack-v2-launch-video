import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { NeonLine } from '../components/NeonLine';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene10_Transition2: React.FC = () => {
  const frame = useCurrentFrame();
  const { line1, line2, productCaption } = COPY.c10;

  const crossfade = interpolate(frame, [0, 8], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      <SceneAudio filename="v4_s10_t2" />
      <DotGrid opacity={0.3} bgColor="transparent" />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F8FAFC', opacity: crossfade }} />

      <NeonLine color="#22D3EE" shape="L-right" startFrame={0} durationFrames={27} />

      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%',
      }}>
        <WordReveal text={line1} startFrame={50} staggerFrames={STAGGER_SLOW} fontSize={52} fontWeight={600} color="#22D3EE" />
        <WordReveal text={line2} startFrame={90} staggerFrames={STAGGER_SLOW} fontSize={40} fontWeight={300} color="#FFFFFF" />
      </div>

      <ProductCaption text={productCaption} startFrame={130} />
    </AbsoluteFill>
  );
};
