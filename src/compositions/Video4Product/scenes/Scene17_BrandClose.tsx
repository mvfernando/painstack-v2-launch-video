import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile, Audio } from 'remotion';
import { DotGridBackground } from '../components/DotGridBackground';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene17_BrandClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tagline, url } = COPY.c17;

  // The 'Bloom Pop-In' (Identical to Intro for brand consistency)
  const START_FOCUS = 5;
  const auroraOpacity = interpolate(frame, [0, 20], [0, 0.4], { extrapolateLeft: 'clamp' });
  const auroraSway = Math.sin(frame / 60) * 8;

  const popSpring = spring({ 
    frame: frame - START_FOCUS, 
    fps, 
    config: { stiffness: 200, damping: 20, mass: 0.5 } 
  });
  
  const logoBlur = interpolate(frame, [START_FOCUS, START_FOCUS + 8], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoScale = interpolate(popSpring, [0, 1], [0.85, 1.0]);
  const logoOpacity = interpolate(frame, [START_FOCUS, START_FOCUS + 4], [0, 1], { extrapolateLeft: 'clamp' });

  // CTA Button animation - Compressed
  const buttonSpring = spring({ frame: frame - 40, fps, config: { stiffness: 100, damping: 10 } });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [1, 1.02]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <SceneAudio filename="v4_s17_close" />
      
      {/* Global Dot Grid */}
      <div style={{ opacity: 0.05 }}>
        <DotGridBackground />
      </div>

      {/* Aurora Pillar (Orange) */}
      <div style={{
          position: 'absolute', top: '-10%', right: '20%', width: '40%', height: '120%',
          background: 'radial-gradient(ellipse, rgba(236, 117, 36, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)', transform: `translateX(${auroraSway}px)`,
          opacity: auroraOpacity
      }} />
      
      {/* FINAL DING SFX */}
      {/* FINAL DING SFX - Sync to button pop */}
      {frame === 45 && <Audio src={staticFile('audio/sfx_ding.mp3')} volume={0.6} />}
      
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: `translate(-50%, -50%) scale(${logoScale})`, 
        opacity: logoOpacity, 
        filter: `blur(${logoBlur}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, 
        fontFamily: 'Inter, sans-serif' 
      }}>
        
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ width: 440, height: 'auto', marginBottom: 8 }} />
        
        <div style={{ 
          width: 80, height: 1, 
          backgroundColor: 'rgba(255,255,255,0.15)', 
          transform: `scaleX(${interpolate(frame, [START_FOCUS + 15, START_FOCUS + 35], [0, 1], { extrapolateLeft: 'clamp' })})` 
        }} />
        
        <div style={{ 
          opacity: interpolate(frame, [START_FOCUS + 25, START_FOCUS + 45], [0, 1], { extrapolateLeft: 'clamp' }), 
          fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.6)', 
          letterSpacing: '0.2em', textTransform: 'uppercase' 
        }}>
          {tagline}
        </div>

        {/* NOTORIOUS CTA BUTTON */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp' }),
          transform: `scale(${buttonScale * pulse})`,
          backgroundColor: '#3B82F6',
          padding: '20px 48px',
          borderRadius: 40,
          color: 'white',
          fontSize: 24,
          fontWeight: 800,
          boxShadow: '0 0 40px rgba(59,130,246,0.6)',
          letterSpacing: 1
        }}>
          {url || 'painstack.ai'}
        </div>
      </div>
    </AbsoluteFill>
  );
};
