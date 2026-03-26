import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface DataroomStackProps {
  topLabel: string;
  topPreview: string;
  topBadge: string;
  stackLabels: string[];
  footer: string;
  accentColor?: string;
  startFrame?: number;
}

export const DataroomStack: React.FC<DataroomStackProps> = ({
  topLabel,
  topPreview,
  topBadge,
  stackLabels,
  footer,
  accentColor = '#818CF8',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 60, damping: 15 },
  });

  const listItems = [
    "Problem Statement",
    "GTM Overview",
    "Market Analysis",
    "SWOT Analysis",
    "Financial Projections",
    "Pitch Deck Outline",
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 60,
      alignItems: 'center',
      width: 1100,
      height: 600,
      fontFamily: 'Inter, sans-serif',
      opacity: interpolate(entrance, [0, 1], [0, 1]),
      transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
    }}>
      {/* LEFT: Cards Fan */}
      <div style={{ position: 'relative', flex: 1, height: '100%' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 60 - i * 4,
            left: 60 + i * 20,
            width: 480,
            height: 340,
            backgroundColor: colors.bgSurface,
            borderRadius: 24,
            border: `1px solid ${colors.borderDefault}`,
            opacity: 0.4 / i,
            transform: `rotate(${i * 2}deg)`,
            zIndex: 5 - i,
          }} />
        ))}

        <div style={{
          position: 'absolute',
          top: 60,
          left: 40,
          width: 520,
          height: 360,
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
          zIndex: 10,
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: 14, 
              backgroundColor: '#EFF6FF', color: '#3B82F6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700
            }}>ES</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A' }}>{topLabel}</div>
              <div style={{ fontSize: 14, color: '#64748B' }}>{topBadge}</div>
            </div>
          </div>
          
          <div style={{ width: '100%', height: 1, backgroundColor: '#F1F5F9', marginBottom: 24 }} />

          <div style={{ 
            fontSize: 17, color: '#475569', lineHeight: 1.6, 
            fontStyle: 'italic', marginBottom: 'auto' 
          }}>
            "{topPreview}"
          </div>

          <div style={{ 
            marginTop: 24,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: '#F8FAFC', color: '#64748B',
            padding: '8px 16px', borderRadius: 99, fontSize: 12, fontWeight: 600,
            border: '1px solid #E2E8F0'
          }}>
             AI Generated · English
          </div>
        </div>
      </div>

      {/* RIGHT: Document List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ 
          fontSize: 11, fontWeight: 700, color: colors.textSecondary, 
          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4,
          opacity: 0.8
        }}>
          Full Document List
        </div>

        <div style={{ 
          display: 'flex', flexDirection: 'column', 
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          borderRadius: 20, border: `1px solid ${colors.borderDefault}`,
          overflow: 'hidden'
        }}>
          {listItems.map((item, i) => (
            <div key={i} style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: i === listItems.length - 1 ? 'none' : `1px solid ${colors.borderDefault}`,
              opacity: interpolate(frame - (startFrame + 20 + i * 4), [0, 15], [0, 1], { extrapolateLeft: 'clamp' }),
              transform: `translateX(${interpolate(frame - (startFrame + 20 + i * 4), [0, 15], [20, 0], { extrapolateLeft: 'clamp' })}px)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 17, fontWeight: 500, color: '#E2E8F0' }}>{item}</span>
              </div>
              <div style={{ 
                fontSize: 11, fontWeight: 700, color: '#94A3B8', 
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '4px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)'
              }}>GEN</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
