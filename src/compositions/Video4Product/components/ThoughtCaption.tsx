import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface ThoughtCaptionProps {
  text: string;
  startFrame?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

export const ThoughtCaption: React.FC<ThoughtCaptionProps> = ({
  text,
  startFrame = 0,
  position = 'bottom-right',
  color = '#64748B',
  fontSize = 18,
  fontWeight = 300,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 60, damping: 14, mass: 1 },
  });
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const translateY = interpolate(s, [0, 1], [12, 0]);

  const basePositionStyles: Record<string, React.CSSProperties> = {
    'top-left':     { top: 60,  left: 80 },
    'top-right':    { top: 60,  right: 80 },
    'bottom-left':  { bottom: 80, left: 80 },
    'bottom-right': { bottom: 80, right: 80 },
    'center':       { bottom: 120, left: '50%', transform: `translateX(-50%) translateY(${translateY}px)` },
  };

  const positionStyle = basePositionStyles[position];

  return (
    <div style={{
      position: 'absolute',
      opacity,
      transform: position !== 'center' ? `translateY(${translateY}px)` : undefined,
      fontFamily: 'Inter, sans-serif',
      fontSize,
      fontWeight,
      fontStyle: 'italic',
      color,
      letterSpacing: '0.01em',
      lineHeight: 1.5,
      maxWidth: 360,
      textAlign: 'right',
      whiteSpace: 'pre-line',
      ...positionStyle,
    }}>
      {text}
    </div>
  );
};
