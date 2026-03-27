import React from 'react';
import { Img, interpolate, useCurrentFrame, Sequence, Audio, staticFile } from 'remotion';
import { TypewriterTextV2 } from './TypewriterTextV2';
import logo1 from '../../../shared/Painstack.ai_logo1.png';

interface LandingHeroProps {
  isTyping?: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ isTyping }) => {
  const frame = useCurrentFrame();

  // T_TYPE_START is T_ZOOM_END + 20 in Scene03_Input: 120 + 20 = 140
  const typingStart = 140;

  // Text typing ends at ~420 frames now (much faster)
  const T_MOUSE_START = 480;
  const T_MOUSE_END = 540;
  const T_CLICK = 550;

  // Mouse trajectory logic
  const mouseX = interpolate(frame, [T_MOUSE_START, T_MOUSE_END], [900, 780], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const mouseY = interpolate(frame, [T_MOUSE_START, T_MOUSE_END], [400, 275], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const mouseScale = interpolate(frame, [T_MOUSE_END, T_CLICK, T_CLICK + 10], [0.8, 0.65, 0.8], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const clickedColor = frame > T_CLICK ? '#2563EB' : '#3B82F6'; // Button darkens when clicked

  return (
    <div style={{
      width: '100%', height: '100%',
      // backgroundColor: '#F8FAFC',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: '#FFFFFF', // Changed text color default to white
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        padding: '36px 100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(15, 23, 42, 0)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Img src={logo1} style={{ height: 40 }} />
        </div>
        <div style={{ display: 'flex', gap: 48, fontSize: 15, fontWeight: 600, color: '#94A3B8' }}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span>Resources</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 15, fontWeight: 700 }}>
          <span style={{ color: '#3B82F6', border: '2px solid rgba(59, 130, 246, 0.5)', padding: '12px 30px', borderRadius: 12 }}>Sign In</span>
          <span style={{ backgroundColor: 'white', color: '#0F172A', padding: '14px 30px', borderRadius: 12, boxShadow: '0 4px 14px rgba(255,255,255, 0.2)' }}>Start Free</span>
        </div>
      </div>

      {/* Hero Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 120, textAlign: 'center',
        paddingLeft: 40, paddingRight: 40
      }}>
        <h1 style={{
          fontSize: 84, fontWeight: 900, color: 'white',
          lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.04em'
        }}>
          From idea to <span style={{
            background: 'linear-gradient(to right, #3B82F6, #ec7524)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}> Business </span>
        </h1>

        <p style={{ fontSize: 24, color: '#94A3B8', maxWidth: 880, lineHeight: 1.6, marginBottom: 70, fontWeight: 500 }}>
          Describe a problem. We validate it against market data, build the GTM plan,<br />
          and generate the foundation for your next big thing.
        </p>

        {/* The Glassmorphic Input Box (Target) */}
        <div id="hero-input-target" style={{
          width: 860, minHeight: 320, 
          backgroundColor: 'rgba(15, 23, 42, 0.4)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          padding: 48, display: 'flex', flexDirection: 'column', gap: 24,
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle neon glow inside the prompt box to match Stitch video */}
          <div style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 40,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(236,117,36,0.2), transparent)',
            filter: 'blur(20px)'
          }} />
          {/* Placeholder or Typing Text inside */}
          {!isTyping ? (
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 22, fontWeight: 400 }}>
              What problem are you solving? Type it here...
            </div>
          ) : (
            <div style={{
              color: 'white', fontSize: 22,
              lineHeight: 1.5, position: 'relative', zIndex: 1,
              fontWeight: 400
            }}>
              <TypewriterTextV2
                text="Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute."
                startFrame={typingStart}
              />
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '10px 24px', borderRadius: 12, fontSize: 14, color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.06)', fontWeight: 600 }}>📄 Document</div>
              <div style={{ border: '1px solid rgba(59,130,246,0.3)', padding: '10px 24px', borderRadius: 12, fontSize: 14, color: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.08)', fontWeight: 600 }}>🔗 Reddit Link</div>
              <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: 12, fontSize: 14, color: '#94A3B8', backgroundColor: 'rgba(255,255,255,0.03)', fontWeight: 500 }}>✨ Pro </div>
            </div>
            <div style={{
              backgroundColor: clickedColor, color: 'white',
              padding: '16px 40px', borderRadius: 14,
              fontWeight: 800, fontSize: 18,
              boxShadow: frame > T_CLICK ? '0 0px 0px transparent' : '0 8px 32px rgba(59, 130, 246, 0.5)',
              transform: frame > T_CLICK ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.1s, background-color 0.1s',
              cursor: 'pointer',
              letterSpacing: 0.5
            }}>VALIDATE</div>
          </div>
          
          {/* Animated Mouse Cursor */}
          {frame > T_MOUSE_START && (
            <div style={{
              position: 'absolute',
              top: mouseY,
              left: mouseX,
              transform: `scale(${mouseScale})`,
              zIndex: 100,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 2.5L20.5 10.5L12.5 13.5L9.5 21.5L5.5 2.5Z" fill="white" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          {/* Typing & Click SFX */}
          {isTyping && frame < 430 && (
            <Sequence from={typingStart}>
              <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.8} />
            </Sequence>
          )}
          {frame >= T_CLICK && (
            <Sequence from={T_CLICK}>
              <Audio src={staticFile('audio/sfx_click.mp3')} volume={1.0} />
            </Sequence>
          )}
        </div>
      </div>
    </div>
  );
};
