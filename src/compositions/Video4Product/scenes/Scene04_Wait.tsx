import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { FlowDiagram } from '../components/FlowDiagram';
import { UserCaption } from '../components/UserCaption';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene04_Wait: React.FC = () => {
  const frame = useCurrentFrame();
  const { steps, productCaption, userCaption } = COPY.c04;

  const crossfade = interpolate(frame, [0, 12], [1, 0], { extrapolateLeft: 'clamp' });

  // Map steps to nodes for FlowDiagram (stripped icons)
  const nodes = steps.map(s => ({
    label: s.text,
    color: s.active ? '#F97316' : '#94A3B8'
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <SceneAudio filename="v4_s4_wait_s" />
      <SceneAudio filename="v4_s4_wait_p" startFrom={150} />
      
      <DotGrid opacity={0.1} bgColor="transparent" />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0A0A0F', opacity: crossfade }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%' }}>
        <FlowDiagram nodes={nodes} startFrame={0} />
      </div>

      <UserCaption text={userCaption} startFrame={30} exitFrame={150} dark />
      <ProductCaption text={productCaption} startFrame={160} dark />
    </AbsoluteFill>
  );
};
// Note: Changed backgroundColor to #F8FAFC and added dark captions
