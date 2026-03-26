import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const Scene18_FadeOut: React.FC = () => {
  const frame = useCurrentFrame();

  // Canvas fade: opacity 1→0 over ~48f (800ms @ 60fps)
  const canvasOpacity = interpolate(frame, [0, 48], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Orange glow persists longer — fades at F160
  const glowOpacity = interpolate(frame, [0, 160, 180], [0.2, 0.2, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <AbsoluteFill style={{ opacity: canvasOpacity, backgroundColor: '#060609' }}>
        {/* Last orange glow */}
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: `rgba(249,115,22,${glowOpacity})`,
          filter: 'blur(100px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
