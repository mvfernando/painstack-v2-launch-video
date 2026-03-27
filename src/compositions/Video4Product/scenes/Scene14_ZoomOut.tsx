import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { FlowDiagram } from '../components/FlowDiagram';
import { UserCaption } from '../components/UserCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene14_ZoomOut: React.FC = () => {
  const { nodes, userCaption } = COPY.c14;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s14_out" />
      <DotGrid opacity={0.2} bgColor="transparent" />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <FlowDiagram nodes={nodes} startFrame={0} />
      </div>
      <UserCaption text={userCaption} startFrame={180} />
    </AbsoluteFill>
  );
};
// Note: This scene 14 used icons previously, now FlowDiagram hides them.
