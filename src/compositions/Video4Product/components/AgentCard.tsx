import { interpolate, useCurrentFrame } from 'remotion';
import { StreamingText } from './StreamingText';

interface Line {
  text: string;
  indent?: boolean;
  dimmed?: boolean;
}

interface AgentCardProps {
  agentLabel: string;
  accentColor: string;
  lines: Line[];
  startFrame?: number;
  lineDelayFrames?: number;
  lightTheme?: boolean;
  style?: React.CSSProperties;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agentLabel,
  accentColor,
  lines,
  startFrame = 0,
  lineDelayFrames = 17,
  lightTheme = false,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  
  const allEnd = startFrame + lines.length * lineDelayFrames + 20;
  const pulse = interpolate(frame, [allEnd, allEnd + 12, allEnd + 24], [1, 1.012, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity,
      transform: `scale(${pulse})`,
      backgroundColor: lightTheme ? '#FFFFFF' : '#0F0F1E',
      border: `1px solid ${lightTheme ? '#E2E8F0' : '#2D2D50'}`,
      borderLeft: `4px solid ${accentColor}`,
      borderRadius: 14,
      padding: 28,
      display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: lightTheme
        ? '0 20px 50px rgba(0,0,0,0.12)'
        : '0 0 40px rgba(0,0,0,0.4)',
      minWidth: 420, // Garante que o card preencha espaço suficiente em layouts lado a lado
      ...style,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        color: accentColor,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 4,
      }}>
        {agentLabel}
      </div>
      <StreamingText
        lines={lines}
        startFrame={startFrame + 8}
        lineDelayFrames={lineDelayFrames}
        accentColor={accentColor}
        color={lightTheme ? '#0F172A' : '#E2E8F0'}
      />
    </div>
  );
};
