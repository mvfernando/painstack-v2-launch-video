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
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: '#1E293B',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        padding: '32px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ height: 36 }} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>painstack</span>
        </div>
        <div style={{ display: 'flex', gap: 40, fontSize: 14, fontWeight: 500, color: '#64748B' }}>
          <span>Solutions</span>
          <span>Integrations</span>
          <span>API Reference</span>
          <span>Community</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 600 }}>
          <span style={{ color: '#3B82F6', border: '1px solid #3B82F6', padding: '10px 24px', borderRadius: 10 }}>Log in</span>
          <span style={{ backgroundColor: '#0F172A', color: 'white', padding: '10px 24px', borderRadius: 10 }}>Start Free</span>
        </div>
      </div>

      {/* Hero Content */}
      <div style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', 
        paddingTop: 100, textAlign: 'center',
        paddingLeft: 40, paddingRight: 40
      }}>
        <h1 style={{ 
          fontSize: 72, fontWeight: 900, color: '#0F172A', 
          lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em' 
        }}>
          From idea to <span style={{ color: '#3B82F6' }}>launched product</span>.<br />
          Your AI venture team, from day 0.
        </h1>
        <p style={{ fontSize: 22, color: '#64748B', maxWidth: 800, lineHeight: 1.6, marginBottom: 56 }}>
          Describe a problem. We validate it against market data, build the GTM plan,<br />
          and generate the foundation for your next big thing.
        </p>

        {/* The White Input Box (Target) */}
        <div id="hero-input-target" style={{
          width: 800, minHeight: 280, backgroundColor: 'white', borderRadius: 24,
          border: '1px solid #E2E8F0', boxShadow: '0 30px 80px rgba(0,0,0,0.06)',
          padding: 40, display: 'flex', flexDirection: 'column', gap: 20,
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Placeholder or Typing Text inside */}
          {!isTyping ? (
            <div style={{ color: '#94A3B8', fontSize: 20, fontWeight: 400 }}>
              What problem are you solving? Type it here...
            </div>
          ) : (
            <div style={{ 
              color: '#334155', fontSize: 20, 
              lineHeight: 1.5, position: 'relative', zIndex: 1 
            }}>
              <TypewriterTextV2 
                text="Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute."
                startFrame={typingStart}
                cursorColor="#3B82F6"
              />
            </div>
          )}
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 16 }}>
               <div style={{ border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: 8, fontSize: 13, color: '#64748B', backgroundColor: '#F8FAFC', fontWeight: 500 }}>Upload Research</div>
               <div style={{ border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: 8, fontSize: 13, color: '#64748B', backgroundColor: '#F8FAFC', fontWeight: 500 }}>Paste URL</div>
            </div>
            <div style={{ 
              backgroundColor: '#3B82F6', color: 'white', 
              padding: '14px 32px', borderRadius: 12, 
              fontWeight: 700, fontSize: 16,
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
            }}>Validate →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
