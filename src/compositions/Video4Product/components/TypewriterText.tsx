import { useCurrentFrame } from 'remotion';

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  fontWeight?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charsPerFrame = 2.3,
  fontSize = 16,
  color = '#E2E8F0',
  cursorColor = '#F97316',
  fontWeight = 400,
}) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor(Math.max(0, (frame - startFrame) * charsPerFrame));
  const displayText = text.slice(0, Math.min(charsToShow, text.length));
  const isTyping = charsToShow <= text.length;
  const showCursor = frame > startFrame && (isTyping || (frame - startFrame) % 60 < 30);
  const cursorBlink = frame % 30 < 15 ? 1 : 0;
  return (
    <div style={{
      fontSize, fontFamily: 'Inter, sans-serif', color, fontWeight, lineHeight: 1.6,
    }}>
      {displayText}
      {showCursor && (
        <span style={{
          opacity: cursorBlink,
          borderRight: `2px solid ${cursorColor}`,
          marginLeft: 2,
        }}>
          &nbsp;
        </span>
      )}
      {!displayText && (
        <span style={{ color: '#64748B' }}>
          Describe your problem or paste a Reddit link...
        </span>
      )}
    </div>
  );
};
