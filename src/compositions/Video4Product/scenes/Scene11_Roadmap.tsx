import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { RoadmapBoard } from '../components/RoadmapBoard';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene11_Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { header, progress, progressPct, weeks, userCaption } = COPY.c11;

  const crossfade = interpolate(frame, [0, 10], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <SceneAudio filename="v4_s11_road" />
      
      {/* Visual transition from dark to light */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'transparent', opacity: crossfade, zIndex: 10 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 80%, rgba(56,189,248,0.04), transparent 50%)' }} />

      <FeatureLabel text="Execution Strategy" startFrame={0} position="top-left" dark />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <RoadmapBoard header={header} progress={progress} progressPct={progressPct} weeks={weeks} startFrame={10} />
      </div>

      <UserCaption text={userCaption} startFrame={140} dark />
    </AbsoluteFill>
  );
};
