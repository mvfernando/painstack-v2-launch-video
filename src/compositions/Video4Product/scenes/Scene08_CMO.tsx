import { AbsoluteFill, Img, staticFile } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { BrowserMockup } from '../components/BrowserMockup';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene08_CMO = () => {
  const { cmo, userCaption } = COPY.c08;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%, rgba(129,140,248,0.1), transparent 60%)' }} />
      <SceneAudio filename="v4_s8_cmo" />
      <FeatureLabel text="Growth Engine" startFrame={0} position="top-left" />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40, width: '100%', justifyContent: 'center', alignItems: 'center'
      }}>
        <AgentCard agentLabel={cmo.label} accentColor={cmo.accentColor} lines={cmo.lines} startFrame={10} style={{ flex: 1 }} />
        
        <div style={{ flex: 1.2 }}>
          <BrowserMockup url="babysitterconnect.com" startFrame={45} width={720} height={460}>
            <Img
              src={staticFile('shared/bcare_landing.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          </BrowserMockup>
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={10} exitFrame={154} />
    </AbsoluteFill>
  );
};
