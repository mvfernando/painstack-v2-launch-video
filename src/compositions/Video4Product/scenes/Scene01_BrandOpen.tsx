import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { DotGridBackground } from '../components/DotGridBackground';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene01_BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { badge } = COPY.c01;

  // 1.5s Blackout Build-up (45 frames at 30fps) - Compressed for 92s Master
  const START_FRAME = 45;
  
  // Aurora Pillars Logic
  const auroraOpacity = interpolate(frame, [START_FRAME, START_FRAME + 20], [0, 0.6], { extrapolateLeft: 'clamp' });
  const auroraSway = Math.sin(frame / 60) * 10;

  // The 'Bloom Pop-In' (Rapid focus and scale)
  const popSpring = spring({ 
    frame: frame - START_FRAME, 
    fps, 
    config: { stiffness: 300, damping: 25, mass: 0.5 } 
  });
  
  const logoBlur = interpolate(frame, [START_FRAME, START_FRAME + 6], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoScale = interpolate(popSpring, [0, 1], [1.3, 1.0]);
  const logoOpacity = interpolate(frame, [START_FRAME, START_FRAME + 4], [0, 1], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <SceneAudio filename="v4_s1_open" />
      {/* Global Dot Grid - Subtly present at 5% opacity */}
      <div style={{ opacity: 0.05 }}>
        <DotGridBackground />
      </div>

      {/* Aurora Pillar 1 (Blue) */}
      <div style={{
          position: 'absolute', top: '-20%', left: '30%', width: '25%', height: '140%',
          background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.12), transparent)',
          filter: 'blur(100px)', transform: `translateX(${auroraSway}px) rotate(-10deg)`,
          opacity: auroraOpacity
      }} />

      {/* Aurora Pillar 2 (Orange) */}
      <div style={{
          position: 'absolute', top: '-10%', right: '25%', width: '30%', height: '120%',
          background: 'linear-gradient(to bottom, transparent, rgba(236, 117, 36, 0.1), transparent)',
          filter: 'blur(120px)', transform: `translateX(${-auroraSway}px) rotate(8deg)`,
          opacity: auroraOpacity
      }} />

      {/* The Logo Reveal (Bloom Focus) */}
      <div style={{
        position: 'absolute', top: '46%', left: '50%', 
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        opacity: logoOpacity,
        filter: `blur(${logoBlur}px)`,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ width: 520, height: 'auto' }} />
      </div>

      {/* Badge Pill: Aparece depois do logo consolidar */}
      <div style={{
        position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)',
        opacity: interpolate(frame, [START_FRAME + 25, START_FRAME + 45], [0, 1], { extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
           padding: '12px 32px', borderRadius: 99, 
           border: '1px solid rgba(255,255,255,0.1)',
           backgroundColor: 'rgba(255,255,255,0.02)',
           backdropFilter: 'blur(20px)',
           color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 700, letterSpacing: '0.15em',
           fontFamily: 'Inter, sans-serif'
        }}>
          {badge}
        </div>
      </div>

      {/* Initial Blackout Overlay */}
      {frame < START_FRAME && <AbsoluteFill style={{ backgroundColor: '#0F172A', zIndex: 100 }} />}
    </AbsoluteFill>
  );
};
