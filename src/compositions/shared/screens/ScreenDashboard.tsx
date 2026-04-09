
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


export const DashboardInputScene: React.FC<{ 
  withInteractions?: boolean;
  theme?: 'light' | 'dark';
  customText?: string;
}> = ({ 
  withInteractions = false, 
  theme = 'dark',
  customText
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isLight = theme === 'light';
  const isVertical = height > width;

  const themeColors = {
    bg: isLight ? colors.lightBgProduct : colors.bg,
    card: isLight ? colors.lightBg : colors.bgCard,
    text: isLight ? colors.lightText : colors.white,
    border: isLight ? colors.lightBorder : colors.border,
    muted: isLight ? colors.lightMuted : colors.muted,
    inputBg: isLight ? '#f1f5f9' : "rgba(15, 23, 42, 0.4)",
  };

  // Entrance
  const entrance = spring({ frame, fps, config: { damping: 20 } });
  
  // Animation props
  const contentOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Typing Simulation
  const text = customText || "An AI-powered tool that helps founders validate their ideas by scanning real-world market pain points...";
  const charsShown = Math.floor(interpolate(frame, [40, 120], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  // Interactions (Zoom & Mouse)
  const cameraZoom = withInteractions ? spring({
    frame: frame - 40,
    fps,
    config: { damping: 25, stiffness: 40 }
  }) : 0;

  const mouseProg = withInteractions ? spring({
    frame: frame - 180,
    fps,
    config: { damping: 25, stiffness: 30 }
  }) : 0;

  const clickSpring = withInteractions ? spring({
    frame: frame - 220,
    fps,
    config: { damping: 12, stiffness: 200 }
  }) : 0;

  const cameraScale = interpolate(cameraZoom, [0, 1], [1, 1.05]);
  
  // Responsive mouse coordinates (Recalibrated for centered layout)
  const targetX = isVertical ? width * 0.76 : width * 0.72;
  const targetY = isVertical ? height * 0.50 : height * 0.60; // Adjusted for center alignment
  
  const mouseX = interpolate(mouseProg, [0, 1], [width * 0.95, targetX]); 
  const mouseY = interpolate(mouseProg, [0, 1], [height * 0.95, targetY]);
  const buttonScale = interpolate(clickSpring, [0, 0.5, 1], [1, 0.85, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: themeColors.bg, overflow: 'hidden', fontFamily: fonts.base }}>
      <div style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Added for vertical centering
        padding: isVertical ? '80px 40px' : '60px 100px',
        transform: `scale(${cameraScale})`,
        transformOrigin: 'center center', // Changed for center scaling
        opacity: contentOpacity,
      }}>
        
        {/* Header Logo & User Badge */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: isVertical ? 'column' : 'row',
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          marginBottom: isVertical ? 60 : 60,
          gap: isVertical ? 24 : 0
        }}>
          <div style={{ position: isVertical ? 'static' : 'absolute', left: isVertical ? 'auto' : 0 }}>
             <img 
                src={staticFile(isLight ? 'shared/Painstack.ai_logo1.png' : 'shared/Painstack.ai_logo2.png')} 
                style={{ height: isVertical ? 48 : 48, width: 'auto', objectFit: 'contain' }} 
                alt="Logo"
              />
          </div>
          
          <div style={{
            background: isLight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(10px)',
            border: `2px solid ${themeColors.border}`,
            borderRadius: 100,
            padding: isVertical ? '12px 28px' : '8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: isVertical ? 16 : 13, // Increased for mobile
            fontWeight: 800,
            color: themeColors.muted,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors.orange }} />
            WELCOME BACK, ELIO 👋
          </div>
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: isVertical ? 54 : 64, // Increased for mobile
          fontWeight: 800, 
          color: themeColors.text, 
          textAlign: 'center',
          maxWidth: isVertical ? '100%' : 900,
          marginBottom: isVertical ? 60 : 60,
          lineHeight: 1.1,
          letterSpacing: '-2px'
        }}>
          What problem do you want<br/> to validate today?
        </h1>

        {/* Input Box */}
        <div style={{
          width: '100%',
          maxWidth: isVertical ? '100%' : 1100,
          background: themeColors.card,
          border: `1px solid ${themeColors.border}`,
          borderRadius: 32,
          padding: isVertical ? 32 : 40, // Slightly increased padding
          boxShadow: isLight ? "0 20px 50px rgba(0,0,0,0.05)" : "0 40px 100px rgba(0,0,0,0.4)",
          position: 'relative'
        }}>
          <div style={{
            background: themeColors.inputBg,
            border: `1px solid ${themeColors.border}`,
            borderRadius: 20,
            padding: isVertical ? 24 : 30,
            minHeight: isVertical ? 240 : 180,
            color: themeColors.text,
            fontSize: isVertical ? 24 : 24, // Increased for mobile
            lineHeight: 1.5,
            marginBottom: isVertical ? 32 : 40,
            fontWeight: 400
          }}>
             {frame < 40 ? (
               <span style={{ color: themeColors.muted, opacity: 0.6 }}>
                 Paste a real complaint or describe the problem in your own words...
               </span>
             ) : (
               <span>{text.substring(0, charsShown)}</span>
             )}
             <span style={{ 
                borderRight: `3px solid ${colors.orange}`,
                marginLeft: 4,
                opacity: frame % 30 < 15 ? 1 : 0 
              }} />
          </div>

          {/* Bottom Actions */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isVertical ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isVertical ? 'stretch' : 'center',
            gap: isVertical ? 20 : 0
          }}>
            <div style={{ 
              display: 'flex', 
              gap: 10,
              justifyContent: isVertical ? 'center' : 'flex-start'
            }}>
              {[
                { icon: '📝', label: isVertical ? '' : 'Free text' },
                { icon: '🔗', label: isVertical ? '' : 'Reddit' },
                { icon: '📄', label: isVertical ? '' : 'Doc' }
              ].map((btn, i) => (
                <div key={i} style={{
                  padding: isVertical ? '10px 16px' : '12px 24px',
                  borderRadius: 12,
                  border: `1px solid ${themeColors.border}`,
                  background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.03)',
                  color: isLight ? colors.lightText : colors.white,
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
              padding: isVertical ? "16px 32px" : "16px 48px",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: isVertical ? 18 : 20,
              boxShadow: `0 15px 30px ${colors.blue}44`,
              transform: `scale(${buttonScale})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <path d="M7 26L5 5L22 17L13.5 19.5L7 26Z" fill={isLight ? "white" : "black"} stroke={isLight ? "black" : "white"} strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
