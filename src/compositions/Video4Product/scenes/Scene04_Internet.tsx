import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import React from 'react';
import { UserCaption } from '../components/UserCaption';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene04_Internet: React.FC = () => {
  const frame = useCurrentFrame();
  const { steps, sources, userCaption, productCaption } = COPY.c04;

  const brainScale = 1 + Math.sin(frame / 15) * 0.08;
  const brainOpacity = interpolate(frame, [0, 20], [0, 0.7], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s4_wait_s" />

      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(129,140,248,0.12), rgba(56,189,248,0.1))',
        filter: 'blur(120px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: `translate(-50%, -50%) scale(${brainScale})`,
        opacity: brainOpacity, fontSize: 56,
      }}>🧠</div>

      <div style={{
        position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', gap: 14, width: '80%',
      }}>
        {steps.map((step, i) => {
          const sStart = 20 + i * 22;
          const sOpacity = interpolate(frame, [sStart, sStart + 12], [0, 1], { extrapolateLeft: 'clamp' });
          const sX = interpolate(frame, [sStart, sStart + 16], [-12, 0], { extrapolateLeft: 'clamp' });
          return (
            <div key={i} style={{
              opacity: sOpacity, transform: `translateX(${sX}px)`,
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#FFFFFF',
              fontWeight: 300,
            }}>
              <span style={{ fontSize: 20 }}>{step.active ? '●' : '○'}</span>
              <span style={{ opacity: step.active ? 1 : 0.4 }}>{step.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 180, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 24,
      }}>
        {sources.map((source, i) => {
          const pillStart = 70 + source.delay;
          const opacity = interpolate(frame, [pillStart, pillStart + 20], [0, 1], { extrapolateLeft: 'clamp' });
          const translateY = interpolate(frame, [pillStart, pillStart + 20], [20, 0], { extrapolateLeft: 'clamp' });
          return (
            <div key={i} style={{
              opacity, transform: `translateY(${translateY}px)`,
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              border: `1px solid rgba(255, 255, 255, 0.1)`,
              borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Inter, sans-serif', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3B82F6', opacity: (frame % 40 < 20 ? 1 : 0.4) }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{source.label}</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{source.count}</div>
              </div>
            </div>
          );
        })}
      </div>

      <UserCaption text={userCaption} startFrame={50} exitFrame={220} />
      <ProductCaption text={productCaption} startFrame={155} />
    </AbsoluteFill>
  );
};
