import { AbsoluteFill } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { FlowDiagram } from '../components/FlowDiagram';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';

export const Scene14_ZoomOut: React.FC = () => {
  const { nodes, userThought } = COPY.c14;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0F' }}>
      <DotGrid opacity={0.2} bgColor="transparent" />

      {/* Flow diagram centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <FlowDiagram nodes={nodes} startFrame={0} />
      </div>

      {/* Thought caption */}
      <ThoughtCaption
        text={userThought}
        startFrame={150}
        position="center"
        color="#64748B"
        fontSize={20}
      />
    </AbsoluteFill>
  );
};
