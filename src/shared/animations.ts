import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const useFadeIn = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
};

export const useSlideUp = (delay = 0, distance = 40) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120, mass: 0.8 } });
  return interpolate(progress, [0, 1], [distance, 0]);
};

export const useScaleIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 150, mass: 0.6 } });
};

export const useFadeOut = (startAt: number, duration = 15) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startAt, startAt + duration], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
};

export const useCounter = (targetValue: number, startFrame: number, duration: number) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  return Math.round(progress * targetValue);
};

export const useTyping = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor((frame - startFrame) * charsPerFrame);
  return text.slice(0, Math.max(0, charsToShow));
};
