import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface StatCardProps {
  value: string;
  label: string;
  accentColor: string;
  startFrame?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  accentColor,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const scale = interpolate(s, [0, 1], [0.80, 1.0]);
  const opacity = interpolate(s, [0, 0.15], [0, 1]);

  // Subtle pulse after entrance
  const pf = startFrame + 30;
  const pulse = interpolate(frame, [pf, pf + 8, pf + 18], [1, 1.025, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      transform: `scale(${scale * pulse})`,
      opacity,
      backgroundColor: colors.bgSurface,
      border: `1px solid ${colors.borderDefault}`,
      borderTop: `3px solid ${accentColor}`,
      borderRadius: 12,
      padding: '28px 32px',
      display: 'flex', flexDirection: 'column',
      gap: 10,
      minWidth: 220,
      boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}18`,
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        fontSize: 52, fontWeight: 800,
        lineHeight: 1,
        color: accentColor,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 400,
        color: colors.textSecondary,
        lineHeight: 1.4,
        maxWidth: 180,
      }}>
        {label}
      </div>
    </div>
  );
};
