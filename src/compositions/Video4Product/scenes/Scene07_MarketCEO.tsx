import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AgentCard } from '../components/AgentCard';
import { DotGrid } from '../components/DotGrid';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';

export const Scene07_MarketCEO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { market, ceo } = COPY.c07;

  // Market card slide from left
  const marketSpring = spring({ frame, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const marketX = interpolate(marketSpring, [0, 1], [-80, 0]);

  // CEO card slide from right (12f delay)
  const ceoSpring = spring({ frame: frame - 12, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const ceoX = interpolate(ceoSpring, [0, 1], [80, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <DotGrid opacity={0.15} bgColor="transparent" dotColor="#CBD5E1" />

      {/* Two cards side by side */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 28,
        width: '85%', maxWidth: 1400,
      }}>
        {/* Market Agent */}
        <div style={{ flex: 1, transform: `translateX(${marketX}px)` }}>
          <AgentCard
            agentLabel={market.label}
            accentColor={market.accentColor}
            lines={market.lines}
            startFrame={0}
            lightTheme
          />
        </div>

        {/* AI CEO */}
        <div style={{ flex: 1, transform: `translateX(${ceoX}px)` }}>
          <AgentCard
            agentLabel={ceo.label}
            accentColor={ceo.accentColor}
            lines={ceo.lines}
            startFrame={12}
            lightTheme
          />
        </div>
      </div>

      {/* Thought captions */}
      <ThoughtCaption
        text={market.userThought}
        startFrame={60}
        position="bottom-right"
        color="#64748B"
      />
      <ThoughtCaption
        text={ceo.userThought}
        startFrame={160}
        position="bottom-right"
        color="#64748B"
      />
    </AbsoluteFill>
  );
};
