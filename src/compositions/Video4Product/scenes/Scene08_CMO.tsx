import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { BrowserMockup } from '../components/BrowserMockup';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';
import { colors } from '../constants/colors';

export const Scene08_CMO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cmo, landing } = COPY.c08;

  // CMO card from left
  const cmoSpring = spring({ frame, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const cmoX = interpolate(cmoSpring, [0, 1], [-80, 0]);

  // Landing page scroll
  const scrollY = interpolate(frame, [40, 190], [0, -30], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 32,
        alignItems: 'center',
        width: '85%', maxWidth: 1400,
      }}>
        {/* CMO Agent Card */}
        <div style={{ flex: 1, transform: `translateX(${cmoX}px)` }}>
          <AgentCard
            agentLabel={cmo.label}
            accentColor={cmo.accentColor}
            lines={cmo.lines}
            startFrame={0}
            lightTheme
          />
        </div>

        {/* Browser Mockup with Landing Page */}
        <BrowserMockup url="babysitterconnect.app" startFrame={12} slideFrom="right">
          <div style={{
            padding: '48px 36px',
            background: 'linear-gradient(180deg, #0F0F1E, #1a1a2e)',
            minHeight: '100%',
            transform: `translateY(${scrollY}px)`,
          }}>
            <div style={{
              fontSize: 28, fontWeight: 700,
              color: '#FFFFFF', lineHeight: 1.2,
              marginBottom: 12,
              fontFamily: 'Inter, sans-serif',
            }}>
              {landing.headline}
            </div>
            <div style={{
              fontSize: 14, color: colors.textSecondary,
              marginBottom: 28, lineHeight: 1.5,
              fontFamily: 'Inter, sans-serif',
            }}>
              {landing.sub}
            </div>
            <div style={{
              background: colors.gradAccent,
              borderRadius: 8,
              padding: '14px 28px',
              color: '#FFFFFF',
              fontSize: 15, fontWeight: 600,
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
            }}>
              {landing.cta}
            </div>
            <div style={{
              marginTop: 20,
              fontSize: 12, color: colors.textMuted,
              fontFamily: 'Inter, sans-serif',
            }}>
              {landing.social}
            </div>
          </div>
        </BrowserMockup>
      </div>

      {/* Thought caption */}
      <ThoughtCaption
        text={cmo.userThought}
        startFrame={80}
        position="bottom-right"
        color="#64748B"
      />
    </AbsoluteFill>
  );
};
