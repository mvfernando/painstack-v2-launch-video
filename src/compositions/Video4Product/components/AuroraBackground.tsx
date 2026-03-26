import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface Blob {
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  phase: number;
}

interface AuroraBackgroundProps {
  blobs?: Blob[];
  baseColor?: string;
}

const defaultBlobs: Blob[] = [
  { x: 20, y: 20, color: 'rgba(26,5,51,0.8)',     size: 600, speed: 6, phase: 0 },
  { x: 70, y: 60, color: 'rgba(12,20,69,0.7)',    size: 500, speed: 8, phase: 2 },
  { x: 80, y: 80, color: 'rgba(249,115,22,0.15)', size: 300, speed: 7, phase: 4 },
];

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  blobs = defaultBlobs,
  baseColor = '#060609',
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: baseColor, overflow: 'hidden' }}>
      {blobs.map((blob, i) => {
        const t     = frame / 60;
        const x     = blob.x + Math.sin(t / blob.speed + blob.phase) * 8;
        const y     = blob.y + Math.cos(t / blob.speed + blob.phase * 1.3) * 6;
        const scale = 1 + Math.sin(t / (blob.speed * 1.5) + blob.phase) * 0.04;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: blob.size, height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(80px)',
            left: `${x}%`, top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            pointerEvents: 'none',
          }} />
        );
      })}
    </AbsoluteFill>
  );
};
