import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DataroomStack } from '../components/DataroomStack';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';

export const Scene13_Dataroom: React.FC = () => {
  const frame = useCurrentFrame();
  const { topLabel, topPreview, topBadge, stackLabels, footer, userThought } = COPY.c13;

  // Light→dark crossfade
  const crossfade = interpolate(frame, [0, 8], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0F' }}>
      {/* Purple glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 400,
        borderRadius: '50%',
        background: 'rgba(129,140,248,0.08)',
        filter: 'blur(100px)',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Light overlay fading out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#F8FAFC',
        opacity: crossfade,
        pointerEvents: 'none',
        zIndex: 20,
      }} />

      {/* DataroomStack centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <DataroomStack
          topLabel={topLabel}
          topPreview={topPreview}
          topBadge={topBadge}
          stackLabels={stackLabels}
          footer={footer}
          startFrame={10}
        />
      </div>

      {/* Thought caption */}
      <ThoughtCaption
        text={userThought}
        startFrame={120}
        position="bottom-right"
        color="#64748B"
      />
    </AbsoluteFill>
  );
};
