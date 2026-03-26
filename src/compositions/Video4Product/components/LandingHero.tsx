import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';

export const LandingHero: React.FC = () => {
  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#F8FAFC',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: '#1E293B'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <Img src={staticFile('shared/Painstack.ai_logo2.png')} style={{ height: 32 }} />
        <div style={{ display: 'flex', gap: 40, fontSize: 14, fontWeight: 500, color: '#64748B' }}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span>Resources</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 600 }}>
          <span style={{ color: '#0F172A' }}>Dashboard</span>
        </div>
      </div>

      {/* Hero Content */}
      <div style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', 
        paddingTop: 100, textAlign: 'center' 
      }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: 24 }}>
          From idea to <span style={{ color: '#F97316' }}>launched product</span>.<br />
          Your AI team, from day 0.
        </h1>
        <p style={{ fontSize: 20, color: '#64748B', maxWidth: 700, lineHeight: 1.6, marginBottom: 48 }}>
          Start with a problem or an idea. In minutes, you'll know if it's worth<br />
          building and get a clear plan to build it.
        </p>

        {/* The ZOOM TARGET: Input Box */}
        <div id="hero-input-target" style={{
          width: 800, height: 280, backgroundColor: 'white', borderRadius: 20,
          border: '1px solid #E2E8F0', boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
          textAlign: 'left'
        }}>
          <div style={{ color: '#94A3B8', fontSize: 18 }}>What problem are you solving? Who ha...</div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 16 }}>
               <div style={{ border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: 6, fontSize: 12, color: '#64748B' }}>Upload NEW</div>
               <div style={{ border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: 6, fontSize: 12, color: '#64748B' }}>Reddit post</div>
            </div>
            <div style={{ backgroundColor: '#DBEAFE', color: '#3B82F6', padding: '12px 24px', borderRadius: 8, fontWeight: 700 }}>Validate →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
