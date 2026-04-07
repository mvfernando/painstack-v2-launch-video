import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
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
  const scale = interpolate(frame, [delay, delay + 6], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span style={{ 
      display: 'inline-block', 
      opacity, 
      transform: `translateY(${y}px) scale(${scale})`,
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
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: colors.lightBg, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: fonts.base,
      padding: isVertical ? '0 40px' : '0 100px',
      textAlign: 'center'
    }}>
      {lines.map((line, i) => {
        const words = line.text.split(' ');
        return (
          <div key={i} style={{ 
            fontSize: isVertical ? 100 : 72, 
            fontWeight: 900, 
            lineHeight: 1.1,
            letterSpacing: '-3px',
            marginBottom: i === lines.length - 1 ? 0 : (isVertical ? 30 : 10),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {words.map((word, j) => {
              const isAccent = line.accent?.word === word;
              const delay = (i * stagger) + (j * 2);
              return (
                <WordReveal 
                  key={j} 
                  text={word} 
                  delay={delay} 
                  color={isAccent ? line.accent?.color : (line.color || colors.lightText)} 
                />
              );
            })}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
