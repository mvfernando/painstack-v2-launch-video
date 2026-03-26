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
      borderRadius: 16,
      padding: '32px 36px',
      boxShadow: '0 50px 100px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.borderLight}`,
      width: 860,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.textDark }}>
          {header}
        </div>
        <div style={{ fontSize: 12, color: colors.textDarkMuted }}>
          {progress}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6, borderRadius: 3,
        backgroundColor: colors.bgLightSurface,
        marginBottom: 28, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${barFill}%`,
          borderRadius: 3,
          backgroundColor: colors.orange,
        }} />
      </div>

      {/* Week columns */}
      <div style={{ display: 'flex', gap: 16 }}>
        {weeks.map((week, wi) => {
          const colStart = startFrame + 12 + wi * 12;
          const colOpacity = interpolate(frame, [colStart, colStart + 10], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const colY = interpolate(frame, [colStart, colStart + 16], [20, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const isActive = week.status === 'active';

          return (
            <div key={wi} style={{
              flex: 1, opacity: colOpacity,
              transform: `translateY(${colY}px)`,
              border: isActive
                ? `1px solid ${colors.cyan}`
                : `1px solid ${colors.borderLight}`,
              borderRadius: 12,
              padding: 16,
              boxShadow: isActive ? '0 0 20px rgba(45,129,224,0.12)' : 'none',
              backgroundColor: isActive ? 'rgba(56,189,248,0.04)' : 'transparent',
            }}>
              {/* Week label */}
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: statusColors[week.status],
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                {week.label}
              </div>
              {/* Tasks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {week.tasks.map((task, ti) => {
                  const taskStart = colStart + 8 + ti * 8;
                  const taskOpacity = interpolate(frame, [taskStart, taskStart + 8], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                  });
                  return (
                    <div key={ti} style={{
                      opacity: taskOpacity,
                      fontSize: 12, lineHeight: 1.4,
                      color: task.done ? colors.textDarkMuted : colors.textDark,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{
                        width: 14, height: 14,
                        borderRadius: 3,
                        border: `1.5px solid ${task.done ? colors.greenBuild : task.active ? colors.cyan : colors.borderLight}`,
                        backgroundColor: task.done ? colors.greenBuild : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: '#FFFFFF', flexShrink: 0,
                      }}>
                        {task.done ? '✓' : ''}
                      </span>
                      <span style={{
                        textDecoration: task.done ? 'line-through' : 'none',
                        opacity: task.done ? 0.6 : 1,
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
