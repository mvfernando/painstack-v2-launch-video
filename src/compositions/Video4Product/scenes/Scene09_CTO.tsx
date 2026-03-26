import { AbsoluteFill } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { BrowserMockup } from '../components/BrowserMockup';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene09_CTO: React.FC = () => {
  const { cto, userCaption } = COPY.c09;

  const stack = [
    { name: 'Lovable', status: 'Available', color: '#22C55E' },
    { name: 'Cursor', status: 'Coming Soon', color: '#94A3B8' },
    { name: 'Base44', status: 'Coming Soon', color: '#94A3B8' },
    { name: 'Bolt.new', status: 'Coming Soon', color: '#94A3B8' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 85%, rgba(56,189,248,0.05), transparent 60%)' }} />
      <SceneAudio filename="v4_s9_cto" />
      <FeatureLabel text="Technical Infrastructure" startFrame={0} position="top-left" dark />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40, width: '90%', justifyContent: 'center', alignItems: 'center'
      }}>
        <AgentCard agentLabel={cto.label} accentColor={cto.accentColor} lines={cto.lines} startFrame={0} lightTheme style={{ flex: 1 }} />
        
        <div style={{ flex: 1.2 }}>
          <BrowserMockup url="lovable.dev" startFrame={30} width={600} height={450} light>
            <div style={{ padding: 30, backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
                AI Tech Stack
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {stack.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 10, background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>{s.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', textAlign: 'center', color: '#94A3B8', fontSize: 12, fontStyle: 'italic' }}>
                Zero code required. 100% buildable.
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={120} dark />
    </AbsoluteFill>
  );
};
