import { AbsoluteFill } from 'remotion';
import { AuroraBackground } from '../components/AuroraBackground';
import { StatCard } from '../components/StatCard';
import { UserCaption } from '../components/UserCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene15_Stats: React.FC = () => {
  const { stats, userCaption } = COPY.c15;

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      <SceneAudio filename="v4_s15_stat" />
      <AuroraBackground baseColor="#08080F" blobs={[{ x: 30, y: 30, color: 'rgba(249,115,22,0.08)', size: 400, speed: 8, phase: 0 }, { x: 70, y: 70, color: 'rgba(129,140,248,0.06)', size: 350, speed: 10, phase: 3 }]} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 32 }}>
        {stats.map((stat, i) => <StatCard key={i} value={stat.value} label={stat.label} accentColor={stat.color} startFrame={i * 15} />)}
      </div>
      <UserCaption text={userCaption} startFrame={80} />
    </AbsoluteFill>
  );
};
