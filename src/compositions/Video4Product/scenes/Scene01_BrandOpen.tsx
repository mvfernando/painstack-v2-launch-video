import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground } from '../components/AuroraBackground';
import { COPY } from '../constants/copy';

export const Scene01_BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance: F60–F180
  const logoSpring = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const logoOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.86, 1.0]);

  // Badge entrance: F100–F220
  const badgeOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const badgeTranslateX = interpolate(frame, [100, 160], [24, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AuroraBackground />

      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        opacity: logoOpacity,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em',
          display: 'flex', alignItems: 'baseline',
        }}>
          <span style={{ color: '#FFFFFF' }}>{COPY.c01.logo}</span>
          <span style={{
            background: 'linear-gradient(90deg, #F97316, #FB923C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>{COPY.c01.logoDot}</span>
        </div>

        {/* Badge */}
        <div style={{
          opacity: badgeOpacity,
          transform: `translateX(${badgeTranslateX}px)`,
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 999,
          padding: '8px 24px',
          fontSize: 12, fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.12em',
        }}>
          {COPY.c01.badge}
        </div>
      </div>
    </AbsoluteFill>
  );
};
