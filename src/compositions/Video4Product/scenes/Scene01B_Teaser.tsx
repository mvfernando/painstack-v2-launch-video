import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';

export const Scene01B_Teaser: React.FC = () => {
  const frame = useCurrentFrame();

  const line1 = "For entrepreneurs with too many ideas.";
  const line2 = "Painstack is your AI validation engine.";
  const line3 = "Real evidence. Zero guessing.";

  const lineStarts = [20, 80, 140];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      {/* Background Aurora depth */}
      <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          opacity: interpolate(frame, [0, 20], [0, 1])
      }} />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '90%',
      }}>
        {[line1, line2, line3].map((line, i) => {
          const start = lineStarts[i];
          const opacity = interpolate(frame, [start - 5, start, 240, 260], [0, 1, 1, 0], { extrapolateLeft: 'clamp' });
          
          return (
            <div key={i} style={{ opacity }}>
              <WordReveal 
                text={line} 
                startFrame={start} 
                fontSize={i === 2 ? 52 : 42} 
                fontWeight={i === 2 ? 800 : 400} 
                color={i === 2 ? '#F97316' : '#FFFFFF'} 
                mode="pop"
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
