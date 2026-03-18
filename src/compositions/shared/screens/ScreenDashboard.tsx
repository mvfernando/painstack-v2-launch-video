
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const ScreenDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Entrance (0-30)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 140, mass: 0.7 }
  });
  const entranceScale = interpolate(entrance, [0, 1], [0.9, 1.0]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Phase 2: Zoom on input (30-110)
  const zoomProgress = interpolate(frame, [30, 110], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const zoomScale = interpolate(zoomProgress, [0, 1], [1.0, 1.35]);
  const zoomY = interpolate(zoomProgress, [0, 1], [0, -60]);

  // Phase 3: Fade out (110-150)
  const fadeOutOpacity = interpolate(frame, [110, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const finalZoomScale = interpolate(frame, [110, 150], [1.35, 1.42], {
    extrapolateLeft: 'clamp'
  });

  const currentScale = frame < 110 ? zoomScale : finalZoomScale;
  const currentOpacity = frame < 110 ? entranceOpacity : fadeOutOpacity;

  // Cursor blink
  const cursorOpacity = Math.round(frame / 12) % 2 === 0 ? 1 : 0;

  return (
    <AbsoluteFill style={{ background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 1400,
        height: 900,
        background: colors.bg,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        display: 'flex',
        opacity: currentOpacity,
        transform: `scale(${entranceScale * (currentScale / entranceScale)}) translateY(${zoomY}px)`,
        transformOrigin: 'center center'
      }}>
        {/* Sidebar */}
        <div style={{
          width: 220,
          background: '#0a1120',
          borderRight: `1px solid #1e2d45`,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0'
        }}>
          {/* Logo */}
          <div style={{ padding: '0 16px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.orange}, ${colors.blue})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: 16,
              fontFamily: fonts.base
            }}>P</div>
            <div style={{ fontFamily: fonts.base, fontSize: 18, fontWeight: 800, color: colors.white }}>
              Painstack<span style={{ color: colors.blue }}>.ai</span>
            </div>
          </div>

          {[
            { label: 'Dashboard', active: true },
            { label: 'My Blueprints' },
            { label: 'Roadmaps' },
            { label: 'Co-founders' },
            { label: 'Dataroom & docs' }
          ].map((item) => (
            <div key={item.label} style={{
              padding: '8px 16px',
              fontSize: 13,
              fontFamily: fonts.base,
              color: item.active ? colors.blue : '#94A3B8',
              background: item.active ? 'rgba(45,129,224,0.12)' : 'transparent',
              borderRight: item.active ? `2px solid ${colors.blue}` : 'none',
              marginBottom: 4,
              cursor: 'pointer'
            }}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '60px 80px', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: fonts.base,
            fontSize: 28,
            fontWeight: 800,
            color: colors.white,
            letterSpacing: '-0.5px',
            margin: '0 0 8px 0'
          }}>
            What problem do you want to validate today?
          </h1>
          <p style={{
            fontFamily: fonts.base,
            fontSize: 14,
            color: '#94A3B8',
            margin: '0 0 40px 0'
          }}>
            Paste a real complaint or describe the problem.
          </p>

          {/* Input Card */}
          <div style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontFamily: fonts.base,
              fontSize: 20,
              color: colors.white,
              lineHeight: 1.5,
              minHeight: 120
            }}>
              An AI tool that helps founders validate...
              <span style={{ 
                opacity: cursorOpacity, 
                borderRight: `2px solid ${colors.blue}`,
                marginLeft: 4
              }}>&nbsp;</span>
            </div>

            <div style={{ height: 1, background: colors.border }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                {['📎 Upload', '🔗 Reddit post', '❓ Guide me'].map(label => (
                  <div key={label} style={{
                    fontSize: 13,
                    fontFamily: fonts.base,
                    color: '#94A3B8',
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: `1px solid ${colors.border}`
                  }}>
                    {label}
                  </div>
                ))}
              </div>
              <div style={{
                background: colors.blue,
                color: 'white',
                padding: '10px 24px',
                borderRadius: 8,
                fontFamily: fonts.base,
                fontSize: 14,
                fontWeight: 600
              }}>
                Validate →
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
