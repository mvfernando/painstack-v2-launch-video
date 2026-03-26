import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BrandBackground } from '../components/BrandBackground';
import { COPY } from '../constants/copy';

export const Scene01_BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { badge } = COPY.c01;

  const logoSpring = spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.15], [0, 1]);

  return (
    <AbsoluteFill>
      <BrandBackground glowOpacity={0.25} />

      {/* Main Logo */}
      <div style={{
        position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%, -50%) scale(' + logoScale + ')',
        opacity: logoOpacity,
      }}>
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ width: 520, height: 'auto' }} />
      </div>

      {/* Badge Pill: FROM IDEA TO BUSINESS */}
      <div style={{
        position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)',
        opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
           padding: '12px 32px', borderRadius: 99, 
           border: '1px solid rgba(255,255,255,0.2)',
           backgroundColor: 'rgba(255,255,255,0.05)',
           color: 'white', fontSize: 16, fontWeight: 700, letterSpacing: '0.15em',
           fontFamily: 'Inter, sans-serif'
        }}>
          {badge}
        </div>
      </div>
    </AbsoluteFill>
  );
};
