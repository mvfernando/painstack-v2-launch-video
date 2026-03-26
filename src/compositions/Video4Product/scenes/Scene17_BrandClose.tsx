import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground } from '../components/AuroraBackground';
import { COPY } from '../constants/copy';

export const Scene17_BrandClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { logo, logoDot, url, tagline } = COPY.c17;

  // Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.15], [0, 1]);

  // URL pill
  const urlOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const urlY = interpolate(frame, [18, 36], [20, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Separator
  const sepScale = interpolate(frame, [30, 52], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Tagline
  const tagOpacity = interpolate(frame, [42, 60], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Glow pulse during hold
  const glowPulse = interpolate(
    frame,
    [60, 90, 120, 150],
    [0.15, 0.22, 0.15, 0.22],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill>
      <AuroraBackground
        blobs={[
          { x: 20, y: 20, color: 'rgba(26,5,51,0.8)',   size: 600, speed: 6, phase: 0 },
          { x: 70, y: 60, color: 'rgba(12,20,69,0.7)',  size: 500, speed: 8, phase: 2 },
          { x: 80, y: 80, color: `rgba(249,115,22,${glowPulse})`, size: 350, speed: 7, phase: 4 },
        ]}
      />

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        opacity: logoOpacity,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em',
          display: 'flex', alignItems: 'baseline',
        }}>
          <span style={{ color: '#FFFFFF' }}>{logo}</span>
          <span style={{
            background: 'linear-gradient(90deg, #F97316, #FB923C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>{logoDot}</span>
        </div>

        {/* URL pill */}
        <div style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 999,
          padding: '8px 24px',
          fontSize: 14, fontWeight: 400,
          color: 'rgba(255,255,255,0.7)',
        }}>
          {url}
        </div>

        {/* Separator */}
        <div style={{
          width: 60, height: 1,
          backgroundColor: 'rgba(255,255,255,0.15)',
          transform: `scaleX(${sepScale})`,
        }} />

        {/* Tagline */}
        <div style={{
          opacity: tagOpacity,
          fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.04em',
        }}>
          {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
