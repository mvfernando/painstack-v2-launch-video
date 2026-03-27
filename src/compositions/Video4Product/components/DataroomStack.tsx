import React from 'react';
import { interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';

const DocumentRow: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: 'clamp' });
  const translateY = interpolate(frame, [delay, delay + 10], [10, 0], { extrapolateLeft: 'clamp' });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      opacity,
      transform: `translateY(${translateY}px)`,
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      transition: 'background-color 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ 
          width: 20, height: 20, 
          backgroundColor: 'rgba(148, 163, 184, 0.2)', 
          border: '1px solid rgba(148, 163, 184, 0.4)',
          borderRadius: 4 
        }} />
        <span style={{ color: '#F1F5F9', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>{label}</span>
      </div>
      <div style={{
        backgroundColor: 'rgba(30, 58, 138, 0.4)',
        border: '1px solid rgba(59, 130, 246, 0.5)',
        color: '#60A5FA',
        padding: '3px 10px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)'
      }}>Gen</div>
    </div>
  );
};

export const DataroomStack: React.FC = () => {
  const frame = useCurrentFrame();

  const labels = [
    'Executive Summary (1-Page)',
    'Problem Statement',
    'Go-to-Market Overview',
    'Market Analysis (TAM/SAM)',
    'Business Model Canvas',
    'SWOT Analysis',
    'Financial Projections (3Y)',
    'Pitch Deck Outline'
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: 60,
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* SFX: PAPER SWEEP / RUSTLE */}
      {frame === 10 && <Audio src={staticFile('audio/sfx_sweep.mp3')} volume={0.5} />}
      {frame === 60 && <Audio src={staticFile('audio/sfx_ding.mp3')} volume={0.2} />}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
        width: '100%',
        maxWidth: 1300
      }}>

        {/* LEFT: Document Stack */}
        <div style={{ position: 'relative', width: 520, height: 420 }}>
          {/* Background Cards for Stack effect */}
          {[3, 2, 1].map((i) => (
            <div key={i} style={{
              position: 'absolute',
              top: i * 20,
              left: i * 30,
              width: 460,
              height: 340,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 28,
              zIndex: 5 - i,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              opacity: 0.6 / i
            }} />
          ))}

          {/* Front Card: Executive Summary */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 460,
            height: 340,
            backgroundColor: 'white',
            borderRadius: 28,
            padding: 40,
            color: '#0F172A',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
              <div style={{
                width: 56, height: 56, 
                backgroundColor: '#EFF6FF', 
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2563EB', fontWeight: 900, fontSize: 22,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
              }}>ES</div>
              <div>
                <h2 style={{ fontWeight: 900, fontSize: 26, margin: 0, letterSpacing: '-0.02em', color: '#1E293B' }}>Executive Summary</h2>
                <div style={{ color: '#64748B', fontSize: 15, fontWeight: 500 }}>1 page · Ready to share</div>
              </div>
            </div>

            <div style={{
              color: '#475569', fontSize: 18, lineHeight: 1.6,
              borderTop: '1px solid #F1F5F9', paddingTop: 28, marginBottom: 'auto',
              fontWeight: 500, letterSpacing: '-0.01em'
            }}>
              "Parents in Portugal & Spain spend 3+ hours per week searching for trusted babysitters. No mobile-first solution exists for neighborhood-based vetting..."
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              color: '#2563EB', backgroundColor: '#EFF6FF',
              padding: '8px 16px', borderRadius: 24, alignSelf: 'flex-start',
              fontSize: 14, fontWeight: 700
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              AI Generated - English
            </div>
          </div>
        </div>

        {/* RIGHT: Document List */}
        <div style={{ width: 440 }}>
          <div style={{
            fontSize: 15, fontWeight: 800, letterSpacing: '0.15em',
            marginBottom: 20, color: '#64748B', textAlign: 'left',
            paddingLeft: 4, textTransform: 'uppercase'
          }}>Full Document List</div>
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            {labels.map((label, i) => (
              <DocumentRow key={label} label={label} delay={i * 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
