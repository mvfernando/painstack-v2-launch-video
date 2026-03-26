import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface BrowserMockupProps {
  children: React.ReactNode;
  url?: string;
  startFrame?: number;
  width?: number;
  height?: number;
  slideFrom?: 'left' | 'right' | 'bottom';
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  children,
  url = 'painstack.ai',
  startFrame = 0,
  width = 640,
  height = 420,
  slideFrom = 'right',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const opacity = interpolate(s, [0, 0.15], [0, 1]);
  const translateX
    = slideFrom === 'right' ? interpolate(s, [0, 1], [80, 0])
    : slideFrom === 'left'  ? interpolate(s, [0, 1], [-80, 0])
    : 0;
  const translateY = slideFrom === 'bottom' ? interpolate(s, [0, 1], [60, 0]) : 0;

  return (
    <div style={{
      width, height, opacity,
      transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      borderRadius: 12,
      border: `1px solid ${colors.borderDefault}`,
      backgroundColor: colors.bgSurface,
      overflow: 'hidden',
      boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Browser bar */}
      <div style={{
        height: 44,
        backgroundColor: colors.bgSurfaceDeep,
        borderBottom: `1px solid ${colors.borderDefault}`,
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div key={i} style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: c,
            }} />
          ))}
        </div>
        {/* URL bar */}
        <div style={{
          flex: 1,
          background: colors.bgSurface,
          borderRadius: 6,
          padding: '4px 10px',
          fontSize: 11,
          color: colors.textMuted,
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'Inter, sans-serif',
        }}>
          <span style={{ opacity: 0.6, fontSize: 9 }}>🔒</span>
          {url}
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
