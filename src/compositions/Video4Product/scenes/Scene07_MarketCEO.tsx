import { AbsoluteFill } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene07_MarketCEO: React.FC = () => {
  const data = COPY.c07;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s7_market" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 15%, rgba(249,115,22,0.1), transparent 60%)' }} />
      <FeatureLabel text="Strategic Alignment" startFrame={0} position="top-left" />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40, width: '90%', justifyContent: 'center'
      }}>
        <AgentCard agentLabel={data.market.label} accentColor={data.market.accentColor} lines={data.market.lines} startFrame={10} />
        <AgentCard agentLabel={data.ceo.label} accentColor={data.ceo.accentColor} lines={data.ceo.lines} startFrame={60} />
      </div>

      <UserCaption text={data.userCaption} startFrame={10} exitFrame={165} />
    </AbsoluteFill>
  );
};
