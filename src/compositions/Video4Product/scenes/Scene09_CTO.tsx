import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { PhoneMockup } from '../components/PhoneMockup';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';

export const Scene09_CTO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cto, app } = COPY.c09;

  // CTO card from left
  const ctoSpring = spring({ frame, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const ctoX = interpolate(ctoSpring, [0, 1], [-80, 0]);

  const dotColors: Record<string, string> = {
    green: '#22C55E',
    amber: '#EAB308',
    red:   '#EF4444',
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40,
        alignItems: 'center',
        width: '85%', maxWidth: 1400,
      }}>
        {/* CTO Agent Card */}
        <div style={{ flex: 1, transform: `translateX(${ctoX}px)` }}>
          <AgentCard
            agentLabel={cto.label}
            accentColor={cto.accentColor}
            lines={cto.lines}
            startFrame={0}
            lightTheme
          />
        </div>

        {/* Phone Mockup */}
        <PhoneMockup startFrame={14} tilt>
          <div style={{
            background: 'linear-gradient(180deg, #0F0F1E, #1a1a2e)',
            padding: '20px 16px',
            height: '100%',
            fontFamily: 'Inter, sans-serif',
          }}>
            {/* App header */}
            <div style={{
              fontSize: 18, fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 20,
              textAlign: 'center',
            }}>
              {app.header}
            </div>

            {/* App items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {app.items.map((item, i) => {
                const itemStart = 30 + i * 15;
                const itemOpacity = interpolate(frame, [itemStart, itemStart + 12], [0, 1], {
                  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                  <div key={i} style={{
                    opacity: itemOpacity,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {/* Avatar circle */}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #818CF8, #38BDF8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FFFFFF', fontSize: 16, fontWeight: 700,
                    }}>
                      {item.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 14, fontWeight: 600,
                        color: '#FFFFFF', marginBottom: 3,
                      }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>
                        {item.sub}
                      </div>
                    </div>
                    {/* Status dot */}
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      backgroundColor: dotColors[item.dot] ?? '#22C55E',
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </PhoneMockup>
      </div>

      {/* THE most important ThoughtCaption — 2 lines, bigger, darker */}
      <ThoughtCaption
        text={cto.userThought}
        startFrame={100}
        position="bottom-right"
        color="#0F172A"
        fontSize={20}
        fontWeight={400}
      />
    </AbsoluteFill>
  );
};
