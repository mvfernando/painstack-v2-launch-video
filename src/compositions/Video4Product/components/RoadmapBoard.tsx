import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface Task {
  text: string;
  done: boolean;
  active?: boolean;
}

interface Week {
  label: string;
  status: 'done' | 'active' | 'pending';
  tasks: Task[];
}

interface RoadmapBoardProps {
  header: string;
  progress: string;
  progressPct: number;
  weeks: Week[];
  startFrame?: number;
}

export const RoadmapBoard: React.FC<RoadmapBoardProps> = ({
  header,
  progress,
  progressPct,
  weeks,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Board entrance
  const boardSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const boardScale = interpolate(boardSpring, [0, 1], [0.82, 1.0]);
  const boardOpacity = interpolate(boardSpring, [0, 0.15], [0, 1]);

  // Progress bar fill
  const barFill = interpolate(frame, [startFrame, startFrame + 60], [0, progressPct], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const statusColors: Record<string, string> = {
    done:    colors.greenBuild,
    active:  colors.cyan,
    pending: colors.textMuted,
  };

  return (
    <div style={{
      transform: `scale(${boardScale})`,
      opacity: boardOpacity,
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: '48px 52px',
      boxShadow: '0 50px 120px rgba(0,0,0,0.06)',
      border: `1px solid ${colors.borderLight}`,
      width: 1000,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 32,
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: colors.textDark, letterSpacing: '-0.02em' }}>
          {header}
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, color: colors.textDarkMuted }}>
          {progress}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 10, borderRadius: 5,
        backgroundColor: colors.bgLightSurface,
        marginBottom: 44, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${barFill}%`,
          borderRadius: 5,
          backgroundColor: colors.orange,
        }} />
      </div>

      {/* Week columns */}
      <div style={{ display: 'flex', gap: 24 }}>
        {weeks.map((week, wi) => {
          const colStart = startFrame + 12 + wi * 12;
          const colOpacity = interpolate(frame, [colStart, colStart + 10], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const colY = interpolate(frame, [colStart, colStart + 16], [24, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const isActive = week.status === 'active';

          return (
            <div key={wi} style={{
              flex: 1, opacity: colOpacity,
              transform: `translateY(${colY}px)`,
              border: isActive
                ? `2px solid ${colors.cyan}`
                : `1px solid ${colors.borderLight}`,
              borderRadius: 16,
              padding: 24,
              boxShadow: isActive ? '0 10px 40px rgba(56,189,248,0.15)' : 'none',
              backgroundColor: isActive ? 'rgba(56,189,248,0.02)' : 'transparent',
            }}>
              {/* Week label */}
              <div style={{
                fontSize: 12, fontWeight: 700,
                color: statusColors[week.status],
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                {week.label}
              </div>
              {/* Tasks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {week.tasks.map((task, ti) => {
                  const taskStart = colStart + 8 + ti * 8;
                  const taskOpacity = interpolate(frame, [taskStart, taskStart + 8], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                  });
                  return (
                    <div key={ti} style={{
                      opacity: taskOpacity,
                      fontSize: 14, lineHeight: 1.5,
                      color: task.done ? colors.textDarkMuted : colors.textDark,
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <span style={{
                        width: 18, height: 18,
                        borderRadius: 4,
                        border: `2px solid ${task.done ? colors.greenBuild : task.active ? colors.cyan : colors.borderLight}`,
                        backgroundColor: task.done ? colors.greenBuild : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: '#FFFFFF', flexShrink: 0,
                      }}>
                        {task.done ? '✓' : ''}
                      </span>
                      <span style={{
                        textDecoration: task.done ? 'line-through' : 'none',
                        opacity: task.done ? 0.6 : 1,
                        fontWeight: task.active ? 500 : 400,
                      }}>
                        {task.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
