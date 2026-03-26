import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
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

  // Top card entrance
  const topSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const topOpacity = interpolate(topSpring, [0, 0.15], [0, 1]);

  // Float animation for top card
  const floatY = Math.sin((frame - startFrame) / 30) * 3;

  // Footer fade
  const footerOpacity = interpolate(frame, [startFrame + 40, startFrame + 60], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'relative',
      width: 520, height: 440,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Stack cards behind — fan effect */}
      {stackLabels.map((label, i) => {
        const cardStart = startFrame + i * 5;
        const cardSpring = spring({
          frame: frame - cardStart,
          fps,
          config: { stiffness: 50, damping: 14, mass: 1.2 },
        });
        const cardOpacity = interpolate(cardSpring, [0, 0.3], [0, 0.7]);
        const maxRotate = (i - 3) * 2; // spread rotation
        const rotate = interpolate(cardSpring, [0, 1], [0, maxRotate]);
        const yOffset = i * 2;
        return (
          <div key={i} style={{
            position: 'absolute',
            bottom: 60 + yOffset,
            left: '50%',
            transform: `translateX(-50%) rotate(${rotate}deg)`,
            opacity: cardOpacity,
            width: 460 - i * 5,
            height: 60,
            backgroundColor: colors.bgSurface,
            borderRadius: 10,
            border: `1px solid ${colors.borderDefault}`,
            display: 'flex', alignItems: 'center',
            padding: '0 20px',
            fontSize: 11, fontWeight: 500,
            color: colors.textSecondary,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {label}
          </div>
        );
      })}

      {/* Top card — Executive Summary */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: `translateX(-50%) translateY(${floatY}px)`,
        opacity: topOpacity,
        width: 480,
        backgroundColor: colors.bgSurface,
        borderRadius: 14,
        border: `1px solid ${accentColor}`,
        padding: '24px 28px',
        boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${accentColor}15`,
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 12,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: accentColor,
            letterSpacing: '0.08em',
          }}>
            {topLabel}
          </div>
          <div style={{
            fontSize: 10, color: colors.textMuted,
            border: `1px solid ${colors.borderDefault}`,
            borderRadius: 6, padding: '3px 8px',
          }}>
            {topBadge}
          </div>
        </div>
        <div style={{
          fontSize: 13, color: colors.textSecondary,
          lineHeight: 1.6,
        }}>
          {topPreview}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        opacity: footerOpacity,
        fontSize: 12, color: colors.textMuted,
        whiteSpace: 'nowrap',
      }}>
        {footer}
      </div>
    </div>
  );
};
