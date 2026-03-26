import { interpolate, useCurrentFrame } from 'remotion';

interface ProductConfirmProps {
  text: string;
  startFrame?: number;
}

export const ProductConfirm: React.FC<ProductConfirmProps> = ({
  text,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + 24], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      bottom: 56,
      left: '50%',
      transform: 'translateX(-50%)',
      opacity,
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeight: 300,
      color: '#64748B',
      letterSpacing: '0.04em',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}>
      {text}
    </div>
  );
};
