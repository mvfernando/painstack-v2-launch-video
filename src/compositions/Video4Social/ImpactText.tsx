import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../shared/brand';

const WordReveal = ({ 
  text, 
  delay, 
  color = colors.lightText 
}: { 
  text: string; 
  delay: number; 
  color?: string 
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [delay, delay + 6], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span style={{ 
      display: 'inline-block', 
      opacity, 
      transform: `translateY(${y}px)`,
      color,
      marginRight: '0.25em'
    }}>
      {text}
    </span>
  );
};

export const ImpactText: React.FC<{
  lines: Array<{ text: string; color?: string; accent?: { word: string; color: string } }>;
  stagger?: number;
}> = ({ lines, stagger = 6 }) => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: colors.lightBg, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: fonts.base,
      padding: '0 100px'
    }}>
      <div style={{ textAlign: 'center' }}>
        {lines.map((line, i) => {
          const words = line.text.split(' ');
          const lineDelay = i * 18; // Stagger between lines

          return (
            <div key={i} style={{ 
              fontSize: 72, 
              fontWeight: 700, 
              lineHeight: 1.2,
              marginBottom: i === lines.length - 1 ? 0 : 10,
              textTransform: 'lowercase'
            }}>
              {words.map((word, j) => {
                const isAccent = line.accent && word.toLowerCase() === line.accent.word.toLowerCase();
                return (
                  <WordReveal 
                    key={j} 
                    text={word} 
                    delay={lineDelay + j * stagger} 
                    color={isAccent ? line.accent?.color : line.color}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
