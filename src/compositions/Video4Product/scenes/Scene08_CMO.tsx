import { AbsoluteFill } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { BrowserMockup } from '../components/BrowserMockup';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene08_CMO: React.FC = () => {
  const { cmo, landing, userCaption } = COPY.c08;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%, rgba(129,140,248,0.1), transparent 60%)' }} />
      <SceneAudio filename="v4_s8_cmo" />
      <FeatureLabel text="Growth Engine" startFrame={0} position="top-left" />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40, width: '100%', justifyContent: 'center', alignItems: 'center'
      }}>
        <AgentCard agentLabel={cmo.label} accentColor={cmo.accentColor} lines={cmo.lines} startFrame={0} style={{ flex: 1 }} />
        
        <div style={{ flex: 1.2 }}>
          <BrowserMockup url="waitlist.painstack.ai" startFrame={30} width={720} height={460}>
            <div style={{ padding: 40, backgroundColor: '#0F172A', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>
                {landing.headline}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 18, fontWeight: 400 }}>
                {landing.sub}
              </div>
              <div style={{ 
                background: 'linear-gradient(90deg, #F97316, #FB923C)', 
                color: '#FFFFFF', 
                padding: '14px 28px', 
                borderRadius: 100, 
                alignSelf: 'flex-start', 
                fontWeight: 700,
                marginTop: 10,
                boxShadow: '0 10px 20px rgba(249,115,22,0.2)'
              }}>
                {landing.cta}
              </div>
              <div style={{ marginTop: 'auto', color: '#64748B', fontSize: 13, borderTop: '1px solid #1E293B', paddingTop: 16 }}>
                ✅ {landing.social}
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={120} />
    </AbsoluteFill>
  );
};
