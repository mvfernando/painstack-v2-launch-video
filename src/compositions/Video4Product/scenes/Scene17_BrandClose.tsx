import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile, Audio } from 'remotion';
import { BrandBackground } from '../components/BrandBackground';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene17_BrandClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tagline, url } = COPY.c17;

  const logoSpring = spring({ frame, fps, config: { stiffness: 80, damping: 12, mass: 1 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.15], [0, 1]);

  // CTA Button animation
  const buttonSpring = spring({ frame: frame - 60, fps, config: { stiffness: 100, damping: 10 } });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });
  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [1, 1.05]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <SceneAudio filename="v4_s17_close" />
      <BrandBackground glowOpacity={0.4} />
      
      {/* FINAL DING SFX */}
      {frame === 65 && <Audio src={staticFile('audio/sfx_ding.mp3')} volume={0.6} />}
      
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: `translate(-50%, -50%) scale(${logoScale})`, 
        opacity: logoOpacity, 
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, 
        fontFamily: 'Inter, sans-serif' 
      }}>
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ width: 440, height: 'auto', marginBottom: 8 }} />
        
        <div style={{ 
          width: 120, height: 2, 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          transform: `scaleX(${interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp' })})` 
        }} />
        
        <div style={{ 
          opacity: interpolate(frame, [42, 60], [0, 1], { extrapolateLeft: 'clamp' }), 
          fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.9)', 
          letterSpacing: '0.15em', textTransform: 'uppercase' 
        }}>
          {tagline}
        </div>

        {/* NOTORIOUS CTA BUTTON */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp' }),
          transform: `scale(${buttonScale * pulse})`,
          backgroundColor: '#3B82F6',
          padding: '20px 48px',
          borderRadius: 40,
          color: 'white',
          fontSize: 24,
          fontWeight: 800,
          boxShadow: '0 0 30px rgba(59,130,246,0.6)',
          letterSpacing: 1
        }}>
          {url || 'painstack.ai'}
        </div>
      </div>
    </AbsoluteFill>
  );
};
