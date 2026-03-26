import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

type LineShape = 'horizontal' | 'L-right' | 'L-left';

interface NeonLineProps {
  color?: string;
  glowColor?: string;
  shape?: LineShape;
  startFrame?: number;
  durationFrames?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const NeonLine: React.FC<NeonLineProps> = ({
  color = '#F97316',
  glowColor,
  shape = 'horizontal',
  startFrame = 0,
  durationFrames = 36,
  strokeWidth = 2,
  width = 1920,
  height = 1080,
}) => {
  const frame = useCurrentFrame();
  const glow = glowColor ?? color;

  let pathD = '';
  let totalLength = 0;
  if (shape === 'horizontal') {
    pathD = `M 0 80 L ${width} 80`;
    totalLength = width;
  } else if (shape === 'L-right') {
    const sx = 200;
    const sy = height - 200;
    const cx = width - 300;
    const ey = height / 2;
    pathD = `M ${sx} ${sy} L ${cx} ${sy} L ${cx} ${ey}`;
    totalLength = (cx - sx) + (sy - ey);
  } else if (shape === 'L-left') {
    const sx = width - 200;
    const sy = height - 200;
    const cx = 300;
    const ey = height / 2;
    pathD = `M ${sx} ${sy} L ${cx} ${sy} L ${cx} ${ey}`;
    totalLength = (sx - cx) + (sy - ey);
  }

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const dashOffset = totalLength * (1 - progress);
  const opacity = interpolate(
    frame,
    [startFrame + durationFrames, startFrame + durationFrames + 24],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const filterId = `neon-${shape}-${startFrame}`;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width={width} height={height} style={{ position: 'absolute', opacity }}>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={pathD} stroke={glow} strokeWidth={strokeWidth + 8}
          fill="none" opacity={0.4}
          filter={`url(#${filterId})`}
          strokeDasharray={totalLength} strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        <path
          d={pathD} stroke={color} strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={totalLength} strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  );
};
