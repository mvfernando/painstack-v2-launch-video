import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Audio, staticFile, Sequence } from 'remotion';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { ProductCaption } from '../components/ProductCaption';
import { UserCaption } from '../components/UserCaption';

const StatusItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  delay: number;
  active: boolean;
}> = ({ icon, label, delay, active }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 20], [0, active ? 1 : 0.3], { extrapolateLeft: 'clamp' });
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      opacity,
      marginBottom: 32,
      fontFamily: 'Inter, sans-serif',
      fontSize: 18,
      color: '#E2E8F0',
      fontWeight: 500
    }}>
      <div style={{ opacity: 0.5 }}>{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export const Scene04_Wait: React.FC = () => {
  const frame = useCurrentFrame();
  const { productCaption, userCaption } = COPY.c04;

  // SFX Timing
  const T_SWEEP = 30;

  // Animations
  const ringScale = (i: number) => interpolate(Math.sin((frame / 20) + i * 0.5), [-1, 1], [1, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s4_wait_s" />

      {/* SFX: SEARCH HUM (Looping) */}
      <Audio src={staticFile('audio/sfx_hum.mp3')} volume={0.2} loop />
      {frame === T_SWEEP && <Audio src={staticFile('audio/sfx_sweep.mp3')} volume={0.4} />}

      <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 800
      }}>
        {/* 2. Central Icon (Brain/Atom) with Rings */}
        <div style={{ position: 'relative', marginBottom: 60, width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', transform: `scale(${ringScale(0)})` }} />
            <div style={{ position: 'absolute', width: 110, height: 110, borderRadius: '50%', border: '4px solid rgba(59, 130, 246, 0.2)', opacity: 0.5, transform: `scale(${ringScale(1)})` }} />
            <div style={{ 
              width: 80, height: 80, borderRadius: '50%', 
              backgroundColor: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
              zIndex: 2
            }}>
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                 <path d="M11 2a10 10 0 1 0 10 10A10 10 0 0 0 11 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                 <path d="M11 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"/>
               </svg>
            </div>
        </div>

        {/* 3. Search Bar Pill */}
        <div style={{
          width: 560,
          height: 64,
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 60
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <span style={{ color: '#F8FAFC', fontSize: 20, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
            Searching Reddit, Hacker News & web...
          </span>
          <div style={{ 
            marginLeft: 'auto', width: 12, height: 12, 
            backgroundColor: '#3B82F6', borderRadius: '50%',
            opacity: Math.sin(frame / 6) * 0.5 + 0.5
          }} />
        </div>

        {/* status items - Compressed for 92s */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', paddingLeft: 120 }}>
           <StatusItem 
             delay={15} active={frame < 50}
             icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>} 
             label="Analyzing evidence signals..." 
           />
           <StatusItem 
             delay={45} active={frame >= 45 && frame < 90}
             icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} 
             label="Generating blueprint with real evidence..." 
           />
           <StatusItem 
             delay={85} active={frame >= 85 && frame < 130}
             icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>} 
             label="Calibrating score against market data..." 
           />
           <StatusItem 
             delay={125} active={frame >= 125}
             icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>} 
             label="Saving your blueprint..." 
           />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 16,
        color: '#64748B',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        opacity: interpolate(frame, [0, 20], [0, 1])
      }}>
        This takes 30-60 seconds — real evidence takes time to gather.
      </div>

      <UserCaption text={userCaption} startFrame={10} exitFrame={100} />
      
      <Sequence from={110}>
        <SceneAudio filename="v4_s4_wait_p" />
        <ProductCaption text={productCaption} startFrame={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
