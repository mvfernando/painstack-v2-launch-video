
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const DocCard: React.FC<{ 
  emoji: string; 
  name: string; 
  meta: string; 
  status: 'Ready' | 'Draft'; 
  delay: number;
}> = ({ emoji, name, meta, status, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 150, mass: 0.7 }
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1.0]);

  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: 10,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      opacity,
      transform: `scale(${scale})`
    }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{emoji}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: colors.white, fontFamily: fonts.base, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: fonts.base, marginBottom: 12 }}>{meta}</div>
      <div style={{
        alignSelf: 'flex-start',
        background: status === 'Ready' ? 'rgba(34,197,94,0.15)' : 'rgba(249,100,38,0.15)',
        color: status === 'Ready' ? colors.green : colors.orange,
        fontSize: 10,
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: 4,
        fontFamily: fonts.base
      }}>
        {status}
      </div>
    </div>
  );
};

export const ScreenDataroom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Entrance (0-20)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  const entranceScale = interpolate(entrance, [0, 1], [0.9, 1.0]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Phase 3: Zoom on card 1 (90-130)
  const zoomProgress = interpolate(frame, [90, 130], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const zoomScale = interpolate(zoomProgress, [0, 1], [1.0, 1.5]);

  // Phase 4: Fade out (130-150)
  const fadeOutOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const currentOpacity = frame < 130 ? entranceOpacity : fadeOutOpacity;

  const docs = [
    { emoji: '📋', name: 'Startup Blueprint', meta: 'Generated · 2 min ago', status: 'Ready' as const, delay: 20 },
    { emoji: '📊', name: 'Market Analysis', meta: 'Generated · 2 min ago', status: 'Ready' as const, delay: 35 },
    { emoji: '🗺️', name: 'Build Roadmap', meta: 'Generated · 2 min ago', status: 'Ready' as const, delay: 50 },
    { emoji: '💰', name: 'Revenue Model', meta: 'In progress', status: 'Draft' as const, delay: 65 },
  ];

  return (
    <AbsoluteFill style={{ background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 1400,
        height: 900,
        background: colors.bg,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        opacity: currentOpacity,
        transform: `scale(${entranceScale * zoomScale})`,
        transformOrigin: '30% 35%'
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: colors.white, fontFamily: fonts.base, marginTop: 0, marginBottom: 4 }}>
          Dataroom & docs
        </h2>
        <p style={{ fontSize: 13, color: '#94A3B8', fontFamily: fonts.base, marginBottom: 32 }}>
          Auto-generated from your Blueprint
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {docs.map((doc, i) => (
            <DocCard key={i} {...doc} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
