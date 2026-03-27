import { AbsoluteFill, useCurrentFrame } from 'remotion';
import React from 'react';

export const DotGridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Slow scrolling background for infinite scale feel (Stitch technique)
  const scrollY = (frame * 0.2) % 24;
  const scrollX = (frame * 0.1) % 24;

  // Out-of-phase aurora movements
  const bloomA = Math.sin(frame / 80) * 40;
  const bloomB = Math.cos(frame / 100) * 30;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {/* Subtle Scrolling Dot Grid */}
      <div style={{
        position: 'absolute',
        inset: -100, // Overscan for scrolling
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        backgroundPosition: `${scrollX}px ${scrollY}px`,
        opacity: 0.8
      }} />

      {/* Ambient Blue Glow (Top Left) - Moving */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        filter: 'blur(120px)',
        transform: `translate(${bloomA}px, ${bloomB}px)`
      }} />

      {/* Ambient Orange Glow (Bottom Right) - Moving */}
      <div style={{
        position: 'absolute',
        bottom: '-25%',
        right: '-15%',
        width: '80%',
        height: '80%',
        background: 'radial-gradient(circle, rgba(236, 117, 36, 0.1) 0%, transparent 70%)',
        filter: 'blur(120px)',
        transform: `translate(${-bloomB}px, ${-bloomA}px)`
      }} />
    </AbsoluteFill>
  );
};
