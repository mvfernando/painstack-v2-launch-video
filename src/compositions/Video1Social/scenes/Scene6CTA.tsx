
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 20 } });
  const logoEntrance = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill style={{ 
        background: `radial-gradient(circle at 50% 50%, ${colors.blue}33 0%, transparent 70%)`,
        opacity: interpolate(entrance, [0, 1], [0, 1])
      }} />

      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', opacity: entrance, transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})` }}>
          <div style={{ position: 'relative', width: 260, height: 260, margin: '0 auto 40px' }}>
            <img 
              src={staticFile('shared/Painstack.ai_logo2.png')} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                position: 'relative',
                transform: `scale(${logoEntrance})`,
              }} 
              alt="Logo"
            />
          </div>

          <h2 style={{
            fontFamily: fonts.base,
            fontSize: 72,
            fontWeight: 900,
            color: colors.white,
            marginBottom: 20,
            letterSpacing: '-3px',
            lineHeight: 1
          }}>
            Validation in seconds.
          </h2>
          
          <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
              marginBottom: 40,
              alignItems: 'center',
              justifyContent: 'center'
          }}>
              {["Free to start", "No card required", "Results in minutes"].map((item, i) => (
                  <React.Fragment key={item}>
                      <div style={{
                          fontSize: 22,
                          color: colors.muted,
                          fontFamily: fonts.base,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                      }}>
                          <span style={{ color: colors.green, fontWeight: 900 }}>✓</span> {item}
                      </div>
                      {i < 2 && <div style={{ color: colors.muted, fontSize: 24, fontWeight: 300 }}>.</div>}
                  </React.Fragment>
              ))}
          </div>

          <div style={{
            padding: '24px 64px',
            borderRadius: 100,
            background: `linear-gradient(135deg, ${colors.orange}, #ff7e47)`,
            color: colors.white,
            fontSize: 28,
            fontWeight: 900,
            display: 'inline-block',
            boxShadow: `0 20px 40px ${colors.orange}44`,
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            GET STARTED FREE →
          </div>
          
          <p style={{
            fontFamily: fonts.base,
            fontSize: 32,
            color: colors.blue,
            fontWeight: 600,
            marginTop: 30,
            letterSpacing: '-1px'
          }}>
            usepainstackai.com
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
