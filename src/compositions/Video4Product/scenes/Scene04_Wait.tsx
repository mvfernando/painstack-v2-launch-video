import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Sequence, spring } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { SceneAudio } from '../shared/SceneAudio';

export const Scene04_Wait: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle pulse for the circle
  const pulse = Math.sin(frame / 12) * 0.04 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8F9FB' }}>
      <SceneAudio filename="v4_s4_wait_s" />
      <SceneAudio filename="v4_s4_wait_p" startFrom={150} />
      
      <DotGrid opacity={0.03} spacing={60} />

      <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40
      }}>
        {/* 1. Mic AI Circle - Simpler/Lighter */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#EBF3FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
          transform: `scale(${pulse})`,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>

        {/* 2. Light Search Pill */}
        <div style={{
          width: 480,
          height: 56,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          opacity: interpolate(frame, [15, 30], [0, 1])
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <span style={{ 
            color: '#334155', 
            fontSize: 18, 
            fontWeight: 500, 
            fontFamily: 'Inter, sans-serif' 
          }}>
            Searching Reddit, Hacker News & web...
          </span>
          <div style={{ 
            marginLeft: 'auto', 
            width: 8, height: 8, 
            backgroundColor: '#3B82F6', 
            borderRadius: '50%',
            opacity: Math.sin(frame / 4) * 0.5 + 0.5 
          }} />
        </div>
      </div>

      {/* 3. Bottom analyzed count (Fade in later) */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 15,
        color: '#94A3B8',
        fontFamily: 'Inter, sans-serif',
        opacity: interpolate(frame, [80, 100], [0, 1])
      }}>
        analyzing 3,241 local conversations...
      </div>
    </AbsoluteFill>
  );
};
