import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { TypewriterTextV2 } from './TypewriterTextV2';

interface LandingHeroProps {
  isTyping?: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ isTyping }) => {
  const frame = useCurrentFrame();

  // T_TYPE_START is T_ZOOM_END + 20 in Scene03_Input: 120 + 20 = 140
  const typingStart = 140;

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#F8FAFC',
      backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.03) 0%, transparent 40%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: '#0F172A',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        padding: '36px 100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Img src={staticFile('shared/Painstack.ai_logo1.png')} style={{ height: 40 }} />
        </div>
        <div style={{ display: 'flex', gap: 48, fontSize: 15, fontWeight: 600, color: '#64748B' }}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span>Resources</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 15, fontWeight: 700 }}>
          <span style={{ color: '#3B82F6', border: '2px solid #3B82F6', padding: '12px 30px', borderRadius: 12 }}>Sign In</span>
          <span style={{ backgroundColor: '#0F172A', color: 'white', padding: '14px 30px', borderRadius: 12, boxShadow: '0 4px 14px rgba(15, 23, 42, 0.2)' }}>Start Free</span>
        </div>
      </div>

      {/* Hero Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 120, textAlign: 'center',
        paddingLeft: 40, paddingRight: 40
      }}>
        <h1 style={{
          fontSize: 84, fontWeight: 900, color: '#0F172A',
          lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.04em'
        }}>
          From idea to <span style={{
            background: 'linear-gradient(to right, #3B82F6, #ec7524)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}> Business </span>
        </h1>

        <p style={{ fontSize: 24, color: '#64748B', maxWidth: 880, lineHeight: 1.6, marginBottom: 70, fontWeight: 500 }}>
          Describe a problem. We validate it against market data, build the GTM plan,<br />
          and generate the foundation for your next big thing.
        </p>

        {/* The White Input Box (Target) */}
        <div id="hero-input-target" style={{
          width: 860, minHeight: 320, backgroundColor: 'white', borderRadius: 32,
          border: '1px solid #E2E8F0', boxShadow: '0 40px 100px rgba(0,0,10,0.08)',
          padding: 48, display: 'flex', flexDirection: 'column', gap: 24,
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Placeholder or Typing Text inside */}
          {!isTyping ? (
            <div style={{ color: '#94A3B8', fontSize: 22, fontWeight: 400 }}>
              What problem are you solving? Type it here...
            </div>
          ) : (
            <div style={{
              color: '#334155', fontSize: 22,
              lineHeight: 1.5, position: 'relative', zIndex: 1,
              fontWeight: 500
            }}>
              <TypewriterTextV2
                text="Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute."
                startFrame={typingStart}
              />
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: 10, fontSize: 14, color: '#64748B', backgroundColor: '#F8FAFC', fontWeight: 600 }}>Upload docs</div>
              <div style={{ border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: 10, fontSize: 14, color: '#ec7524', backgroundColor: '#F8FAFC', fontWeight: 600 }}>I have a Reddit post</div>
              <div style={{ border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: 10, fontSize: 14, color: '#64748B', backgroundColor: '#F8FAFC', fontWeight: 600 }}>Guide me </div>
            </div>
            <div style={{
              backgroundColor: '#3B82F6', color: 'white',
              padding: '16px 40px', borderRadius: 14,
              fontWeight: 800, fontSize: 18,
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              cursor: 'pointer'
            }}>Validate →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
