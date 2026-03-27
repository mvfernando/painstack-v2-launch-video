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
  mode?: 'fade' | 'pop';
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  startFrame = 0,
  staggerFrames = 10,
  fontSize = 64,
  fontWeight = 400,
  gradient,
  color = '#FFFFFF',
  italic = false,
  textAlign = 'center',
  style = {},
  highlights,
  mode = 'pop',
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
        
        // Pop Animation Config
        const popSpring = spring({
          frame: frame - wordStart,
          fps,
          config: { stiffness: 180, damping: 18, mass: 0.8 },
        });

        const opacity = interpolate(frame, [wordStart, wordStart + 5], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });

        // Stitch-style Focus/Bloom logic
        const blur = mode === 'pop' 
          ? interpolate(frame, [wordStart, wordStart + 10], [15, 0], { extrapolateRight: 'clamp' })
          : 0;
        
        const scale = mode === 'pop'
          ? interpolate(popSpring, [0, 1], [0.85, 1.0])
          : 1;

        const translateY = mode === 'pop'
          ? 0
          : interpolate(popSpring, [0, 1], [-15, 0]);

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
            transform: `scale(${scale}) translateY(${translateY}px)`,
            filter: `blur(${blur}px)`,
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
