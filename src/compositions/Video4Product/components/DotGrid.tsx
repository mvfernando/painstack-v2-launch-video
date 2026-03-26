import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface DotGridProps {
  dotColor?: string;
  bgColor?: string;
  dotSize?: number;
  spacing?: number;
  slowZoom?: boolean;
  opacity?: number;
}

export const DotGrid: React.FC<DotGridProps> = ({
  dotColor = '#1E1E35',
  bgColor = '#0D0D16',
  dotSize = 2,
  spacing = 20,
  slowZoom = true,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const scale = slowZoom
    ? interpolate(frame, [0, 300], [1.0, 1.04], { extrapolateRight: 'clamp' })
    : 1;
  const pid = `dots-${Math.round(dotSize * 10)}-${Math.round(spacing)}`;
  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: 'hidden', opacity }}>
      <svg width="100%" height="100%"
        style={{ position: 'absolute', transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <defs>
          <pattern id={pid} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <circle cx={spacing / 2} cy={spacing / 2} r={dotSize / 2} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </AbsoluteFill>
  );
};
