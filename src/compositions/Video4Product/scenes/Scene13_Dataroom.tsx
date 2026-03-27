import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DataroomStack } from '../components/DataroomStack';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene13_Dataroom: React.FC = () => {
  const frame = useCurrentFrame();
  const { userCaption } = COPY.c13;

  const crossfade = interpolate(frame, [0, 12], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s13_data" />
      <div style={{ position: 'absolute', width: 600, height: 400, borderRadius: '50%', background: 'rgba(129,140,248,0.08)', filter: 'blur(100px)', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F8FAFC', opacity: crossfade, zIndex: 20 }} />
      <FeatureLabel text="Investor Dataroom" startFrame={0} position="top-left" />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <DataroomStack />
      </div>

      <UserCaption text={userCaption} startFrame={50} exitFrame={190} />
    </AbsoluteFill>
  );
};
