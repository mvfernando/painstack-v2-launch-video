import { interpolate, useCurrentFrame } from 'remotion';

interface Line {
  text: string;
  indent?: boolean;
  dimmed?: boolean;
}

interface StreamingTextProps {
  lines: Line[];
  startFrame?: number;
  lineDelayFrames?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
}

export const StreamingText: React.FC<StreamingTextProps> = ({
  lines,
  startFrame = 0,
  lineDelayFrames = 17,
  fontSize = 18, // Upscaled from 15
  color = '#E2E8F0',
  accentColor = '#F97316',
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {lines.map((line, i) => {
        const lineStart = startFrame + i * lineDelayFrames;
        const opacity = interpolate(frame, [lineStart, lineStart + 10], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const translateX = interpolate(frame, [lineStart, lineStart + 16], [-8, 0], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const isEmoji = /^[^\x00-\x7F]/.test(line.text.trim());
        const textColor = line.dimmed ? '#64748B' : isEmoji ? accentColor : color;
        return (
          <div key={i} style={{
            opacity,
            transform: `translateX(${translateX}px)`,
            paddingLeft: line.indent ? 20 : 0,
            fontSize,
            fontFamily: 'Inter, sans-serif',
            color: textColor,
            lineHeight: 1.5,
            fontWeight: line.dimmed ? 300 : 400,
          }}>
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
