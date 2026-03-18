
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  staticFile,
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const DashboardInputScene: React.FC<{ withInteractions?: boolean }> = ({ withInteractions = false }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Entrance
  const entrance = spring({ frame, fps, config: { damping: 20 } });
  
  // Animation props
  const contentOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Typing Simulation
  const text = "An AI-powered tool that helps founders validate their ideas by scanning real-world market pain points...";
  const charsShown = Math.floor(interpolate(frame, [40, 120], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  // Interactions (Zoom & Mouse)
  const cameraZoom = withInteractions ? spring({
    frame: frame - 40,
    fps,
    config: { damping: 25, stiffness: 40 }
  }) : 0;

  const mouseProg = withInteractions ? spring({
    frame: frame - 120,
    fps,
    config: { damping: 25, stiffness: 30 }
  }) : 0;

  const clickSpring = withInteractions ? spring({
    frame: frame - 142,
    fps,
    config: { damping: 12, stiffness: 200 }
  }) : 0;

  const cameraScale = interpolate(cameraZoom, [0, 1], [1, 1.1]);
  // Refined mouse coordinates to hit the "Validate" button precisely
  // Center of screen is 960x540. Button is bottom-right of the 1100px wide box.
  const mouseX = interpolate(mouseProg, [0, 1], [width * 0.95, width * 0.75]); 
  const mouseY = interpolate(mouseProg, [0, 1], [height * 0.95, height * 0.78]);
  const buttonScale = interpolate(clickSpring, [0, 0.5, 1], [1, 0.9, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: 'hidden', fontFamily: fonts.base }}>
      <div style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 100px',
        transform: `scale(${cameraScale})`,
        transformOrigin: 'center 70%',
        opacity: contentOpacity,
      }}>
        
        {/* Header Logo & User Badge */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          position: 'relative',
          marginBottom: 60
        }}>
          <div style={{ position: 'absolute', left: 0 }}>
             <img 
                src={staticFile('shared/Painstack.ai_logo2.png')} 
                style={{ height: 48, width: 'auto', objectFit: 'contain' }} 
                alt="Logo"
              />
          </div>
          
          <div style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: `1px solid ${colors.border}`,
            borderRadius: 100,
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            fontWeight: 700,
            color: colors.muted,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.orange }} />
            WELCOME BACK, ELIO 👋
          </div>
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: 64, 
          fontWeight: 800, 
          color: colors.white, 
          textAlign: 'center',
          maxWidth: 900,
          marginBottom: 60,
          lineHeight: 1.1,
          letterSpacing: '-2px'
        }}>
          What problem do you want<br/> to validate today?
        </h1>

        {/* Input Box */}
        <div style={{
          width: '100%',
          maxWidth: 1100,
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 32,
          padding: 40,
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
          position: 'relative'
        }}>
          <div style={{
            background: "rgba(15, 23, 42, 0.4)",
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: 30,
            minHeight: 180,
            color: colors.white,
            fontSize: 24,
            lineHeight: 1.5,
            marginBottom: 40,
            fontWeight: 300
          }}>
             {frame < 40 ? (
               <span style={{ color: colors.muted, opacity: 0.6 }}>
                 Paste a real complaint or describe the problem in your own words...
               </span>
             ) : (
               <span>{text.substring(0, charsShown)}</span>
             )}
             <span style={{ 
                borderRight: `3px solid ${colors.blue}`,
                marginLeft: 4,
                opacity: frame % 30 < 15 ? 1 : 0 
              }} />
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 15 }}>
              {[
                { icon: '📎', label: 'Upload a document' },
                { icon: '🔗', label: 'I have a Reddit post' },
                { icon: '❓', label: 'Guide me with questions', color: colors.orange }
              ].map((btn, i) => (
                <div key={i} style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: btn.color || colors.white,
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span>{btn.icon}</span> {btn.label}
                </div>
              ))}
            </div>

            <div style={{
              background: colors.blue,
              color: colors.white,
              padding: "16px 48px",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 20,
              boxShadow: `0 15px 30px ${colors.blue}44`,
              transform: `scale(${buttonScale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              Validate <span style={{ fontSize: 24 }}>→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse Cursor */}
      {withInteractions && (
        <div style={{
          position: 'absolute',
          left: mouseX,
          top: mouseY,
          width: 32,
          height: 32,
          zIndex: 100,
          pointerEvents: 'none',
          opacity: interpolate(mouseProg, [0, 0.1, 0.9, 1], [0, 1, 1, 0.2])
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M7 26L5 5L22 17L13.5 19.5L7 26Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
