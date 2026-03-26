import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PhoneMockupProps {
  children: React.ReactNode;
  startFrame?: number;
  width?: number;
  tilt?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  startFrame = 0,
  width = 280,
  tilt = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const height = width * 2.16;
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const translateX = interpolate(s, [0, 1], [80, 0]);
  const rotateY = tilt ? interpolate(s, [0, 1], [12, 0]) : 0;
  const opacity = interpolate(s, [0, 0.15], [0, 1]);
  return (
    <div style={{
      width, height, opacity,
      transform: `translateX(${translateX}px) perspective(1000px) rotateY(${rotateY}deg)`,
      borderRadius: 44,
      background: '#1a1a2e',
      border: '2px solid #2a2a4a',
      boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 80, height: 24,
        background: '#1a1a2e',
        borderRadius: '0 0 14px 14px',
        zIndex: 10,
      }} />
      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 42,
        overflow: 'hidden',
        paddingTop: 28,
      }}>
        {children}
      </div>
    </div>
  );
};
