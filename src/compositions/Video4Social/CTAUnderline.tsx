
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../../shared/brand';

export const CTAUnderline: React.FC<{ 
  width: number; 
  delay: number; 
  duration?: number;
  color?: string;
}> = ({ width, delay, duration = 30, color = colors.orange }) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dashOffset = width * (1 - progress);

  return (
    <svg width={width} height="4" viewBox={`0 0 ${width} 4`}>
      <path
        d={`M 0 2 L ${width} 2`}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={width}
        strokeDashoffset={dashOffset}
        fill="none"
      />
    </svg>
  );
};
