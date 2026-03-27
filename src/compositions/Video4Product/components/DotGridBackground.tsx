import { AbsoluteFill } from 'remotion';
import React from 'react';

export const DotGridBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {/* Subtle Dot Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        opacity: 0.8
      }} />

      {/* Ambient Blue Glow (Top Left) */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
        filter: 'blur(80px)'
      }} />

      {/* Ambient Orange Glow (Bottom Right) */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(circle, rgba(236, 117, 36, 0.12) 0%, transparent 60%)',
        filter: 'blur(80px)'
      }} />
    </AbsoluteFill>
  );
};
