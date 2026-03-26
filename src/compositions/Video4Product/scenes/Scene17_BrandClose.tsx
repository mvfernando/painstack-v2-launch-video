import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { BrandBackground } from '../components/BrandBackground';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene17_BrandClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tagline } = COPY.c17;

  const logoSpring = spring({ frame, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.15], [0, 1]);

  return (
    <AbsoluteFill>
      <SceneAudio filename="v4_s17_close" />
      <BrandBackground glowOpacity={0.3} />
      
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: `translate(-50%, -50%) scale(${logoScale})`, 
        opacity: logoOpacity, 
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, 
        fontFamily: 'Inter, sans-serif' 
      }}>
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ width: 440, height: 'auto', marginBottom: 8 }} />
        
        <div style={{ 
          width: 80, height: 1, 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          transform: `scaleX(${interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp' })})` 
        }} />
        
        <div style={{ 
          opacity: interpolate(frame, [42, 60], [0, 1], { extrapolateLeft: 'clamp' }), 
          fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', 
          letterSpacing: '0.15em', textTransform: 'uppercase' 
        }}>
          {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
