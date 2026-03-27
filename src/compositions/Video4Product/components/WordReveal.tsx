import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface WordRevealProps {
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  fontSize?: number;
  fontWeight?: number;
  gradient?: string;
  color?: string;
  italic?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  highlights?: Record<string, string>;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  startFrame = 0,
  staggerFrames = 12,
  fontSize = 64,
  fontWeight = 400,
  gradient,
  color = '#FFFFFF',
  italic = false,
  textAlign = 'center',
  style = {},
  highlights,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
      gap: '0.25em', ...style,
    }}>
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerFrames;
        const prog = spring({
          frame: frame - wordStart,
          fps,
          config: { stiffness: 80, damping: 12, mass: 1 },
        });
        const opacity = interpolate(frame, [wordStart, wordStart + 10], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const translateY = interpolate(prog, [0, 1], [-15, 0]);
        let finalColor = color;
        if (highlights) {
          const match = Object.keys(highlights).find(k => word.toLowerCase().includes(k.toLowerCase()));
          if (match) finalColor = highlights[match];
        }

        const textStyle: React.CSSProperties = gradient
          ? {
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          : { color: finalColor };

        return (
          <span key={i} style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            fontSize, fontWeight,
            fontStyle: italic ? 'italic' : 'normal',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.1,
            letterSpacing: '0px',
            display: 'inline-block',
            ...textStyle,
          }}>
            {word}
          </span>
        );
      })}
    </div>
  );
};
