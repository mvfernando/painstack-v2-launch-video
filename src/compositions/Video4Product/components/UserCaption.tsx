import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface UserCaptionProps {
  text:        string;
  startFrame?: number;
  exitFrame?:  number; 
  dark?:       boolean; // Para fundos claros
}

export const UserCaption = ({
  text, startFrame = 0, exitFrame, dark = false,
}: UserCaptionProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ 
    frame: frame - startFrame, 
    fps,
    config: { stiffness: 60, damping: 14, mass: 1 } 
  });
  const enterOpacity = interpolate(s, [0, 1], [0, 1]);

  const exitOpacity = exitFrame
    ? interpolate(frame, [exitFrame, exitFrame + 15], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      })
    : 1;

  const opacity    = Math.min(enterOpacity, exitOpacity);
  const translateY = interpolate(s, [0, 1], [10, 0]);

  return (
    <div style={{
      position:    'absolute',
      bottom:       40,
      left:        '50%',
      transform:   `translateX(-50%) translateY(${translateY}px)`,
      opacity,
      fontFamily:  'Inter, sans-serif',
      fontSize:     26,
      fontWeight:   300,
      fontStyle:   'italic',
      color:       dark ? '#1E293B' : '#CBD5E1', 
      letterSpacing: '0.01em',
      whiteSpace:  'nowrap',
      textAlign:   'center',
      textShadow:  dark ? 'none' : '0 2px 10px rgba(0,0,0,0.4)',
      pointerEvents: 'none',
      zIndex: 100,
    }}>
      {text}
    </div>
  );
};
