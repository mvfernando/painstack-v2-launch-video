
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const RoadmapPhase: React.FC<{ 
  name: string; 
  weeks: string; 
  tasks: { text: string; status: 'done' | 'active' | 'pending' }[];
  dotColor: string;
  delay: number;
}> = ({ name, weeks, tasks, dotColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 }
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [15, 0]);

  return (
    <div style={{
      display: 'flex',
      gap: 14,
      opacity,
      transform: `translateY(${translateY}px)`,
      marginBottom: 32
    }}>
      <div style={{ 
        width: 10, 
        height: 10, 
        borderRadius: '50%', 
        background: dotColor,
        marginTop: 6,
        boxShadow: dotColor === colors.blue ? `0 0 10px ${colors.blue}` : 'none'
      }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.white, fontFamily: fonts.base }}>{name}</div>
        <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: fonts.base, marginBottom: 6 }}>{weeks}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {tasks.map((task, i) => (
            <div key={i} style={{ 
              fontSize: 12, 
              color: task.status === 'done' ? colors.green : task.status === 'active' ? colors.blue : '#94A3B8',
              fontFamily: fonts.base,
              display: 'flex',
              gap: 6
            }}>
              <span>{task.status === 'done' ? '✓' : task.status === 'active' ? '→' : '○'}</span>
              <span>{task.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ScreenRoadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Entrance (0-20)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  const entranceScale = interpolate(entrance, [0, 1], [0.9, 1.0]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Phase 3: Pan lateral + zoom (100-130)
  const panProgress = interpolate(frame, [100, 130], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const translateX = interpolate(panProgress, [0, 1], [0, -40]);
  const zoomScale = interpolate(panProgress, [0, 1], [1.0, 1.25]);

  // Phase 4: Fade out (130-150)
  const fadeOutOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const currentOpacity = frame < 130 ? entranceOpacity : fadeOutOpacity;

  const phases = [
    { 
      name: 'Validation', 
      weeks: 'Weeks 1–2', 
      dotColor: colors.green,
      delay: 20,
      tasks: [
        { text: 'Reddit signal', status: 'done' as const },
        { text: 'ICP defined', status: 'done' as const },
        { text: 'Interview 10 leads', status: 'active' as const }
      ]
    },
    { 
      name: 'MVP', 
      weeks: 'Weeks 3–8', 
      dotColor: colors.blue,
      delay: 38,
      tasks: [
        { text: 'Core validation flow', status: 'pending' as const },
        { text: 'Stripe billing', status: 'pending' as const },
        { text: 'Beta users', status: 'pending' as const }
      ]
    },
    { 
      name: 'Launch', 
      weeks: 'Weeks 9–10', 
      dotColor: '#94A3B8',
      delay: 56,
      tasks: [
        { text: 'Product Hunt', status: 'pending' as const },
        { text: 'LinkedIn + X', status: 'pending' as const },
        { text: 'Ambassador programme', status: 'pending' as const }
      ]
    },
    { 
      name: 'Growth', 
      weeks: 'Month 3+', 
      dotColor: '#94A3B8',
      delay: 74,
      tasks: [
        { text: 'Paid acquisition', status: 'pending' as const },
        { text: 'Team expansion', status: 'pending' as const }
      ]
    },
  ];

  return (
    <AbsoluteFill style={{ background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 1400,
        height: 900,
        background: colors.bg,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        opacity: currentOpacity,
        transform: `scale(${entranceScale * zoomScale}) translateX(${translateX}px)`,
      }}>
        <div style={{ fontSize: 11, color: colors.orange, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, fontFamily: fonts.base }}>
          BUILD PLAN
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.white, fontFamily: fonts.base, marginTop: 0, marginBottom: 48 }}>
          Your path to launch
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RoadmapPhase {...phases[0]} />
            <RoadmapPhase {...phases[2]} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RoadmapPhase {...phases[1]} />
            <RoadmapPhase {...phases[3]} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
