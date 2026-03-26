import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface MouseCursorProps {
  startFrame: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  clickFrame: number;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
  startFrame, startX, startY, endX, endY, clickFrame
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const move = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 45, damping: 15 },
  });

  const curX = interpolate(move, [0, 1], [startX, endX]);
  const curY = interpolate(move, [0, 1], [startY, endY]);

  const clickScale = spring({
    frame: frame - clickFrame,
    fps,
    config: { stiffness: 200, damping: 10 },
  });
  const scale = interpolate(clickScale, [0, 0.5, 1], [1, 0.8, 1]);

  const rippleOpacity = interpolate(frame, [clickFrame, clickFrame + 20], [0.6, 0], { extrapolateLeft: 'clamp' });
  const rippleScale = interpolate(frame, [clickFrame, clickFrame + 20], [0, 2.5], { extrapolateLeft: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: curX,
      top: curY,
      transform: `scale(${scale})`,
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      {/* Click ripple */}
      <div style={{
        position: 'absolute',
        width: 30, height: 30,
        borderRadius: '50%',
        border: '2px solid rgba(249,115,22,0.8)',
        opacity: rippleOpacity,
        transform: `translate(-50%, -50%) scale(${rippleScale})`,
      }} />

      {/* Cursor Icon (Simple SVG) */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66202 19.4678L9.2081 12.0298L5.20456 12.0001L17.7071 4.29289C18.1133 4.0436 18.6321 4.1751 18.8829 4.5828C18.9619 4.71123 19 4.85871 19 5.00898V17.0001C19 17.5524 18.5523 18.0001 18 18.0001C17.7971 18.0001 17.5997 17.9387 17.4335 17.8241L12.5526 14.4601L9.21557 19.9678C8.92484 20.4475 8.29828 20.6 7.81858 20.3093C7.68345 20.2273 7.57011 20.1135 7.48866 19.978L5.66202 19.4678Z" fill="white" stroke="black" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
