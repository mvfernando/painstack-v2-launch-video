import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface FeatureLabelProps {
  text:        string;
  startFrame?: number;
  position?:  'top-left' | 'top-right' | 'top-center';
  dark?:       boolean; // Para fundos claros
}

export const FeatureLabel = ({
  text, startFrame = 0, position = 'top-left', dark = false,
}: FeatureLabelProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ 
    frame: frame - startFrame, 
    fps,
    config: { stiffness: 80, damping: 12, mass: 0.8 } 
  });
  const opacity    = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const translateY = interpolate(s, [0, 1], [12, 0]);

  const posStyle: React.CSSProperties =
    position === 'top-left'   ? { top: 48, left: 60 } :
    position === 'top-right'  ? { top: 48, right: 60 } :
                                { top: 48, left: '50%', transform: `translateX(-50%) translateY(${translateY}px)` };

  return (
    <div style={{
      position:        'absolute',
      opacity,
      transform:       position !== 'top-center' ? `translateY(${translateY}px)` : undefined,
      background:      dark ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.08)',
      border:          dark ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.12)',
      borderRadius:     100,
      padding:         '10px 24px',
      fontFamily:      'Inter, sans-serif',
      fontSize:         18,
      fontWeight:       700,
      color:           dark ? '#475569' : '#FFFFFF',
      letterSpacing:   '0.03em',
      pointerEvents:   'none',
      zIndex: 50,
      ...posStyle,
    }}>
      {text}
    </div>
  );
};
