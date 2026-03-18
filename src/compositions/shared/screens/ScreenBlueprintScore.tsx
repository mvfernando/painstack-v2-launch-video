
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

const MetricRow: React.FC<{ label: string; value: string; color: string; delay: number }> = ({ label, value, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 }
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateX = interpolate(entrance, [0, 1], [20, 0]);

  return (
    <div style={{
      background: '#0F172A',
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'space-between',
      opacity,
      transform: `translateX(${translateX}px)`,
      marginBottom: 8
    }}>
      <div style={{ fontFamily: fonts.base, fontSize: 13, color: colors.white }}>{label}</div>
      <div style={{ fontFamily: fonts.base, fontSize: 13, color, fontWeight: 700 }}>{value}</div>
    </div>
  );
};

export const ScreenBlueprintScore: React.FC = () => {
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

  // Phase 2: Score animation (20-110)
  // Progress ring
  const circleProgress = interpolate(frame, [20, 100], [0, 0.87], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1)
  });
  const strokeDashoffset = 515.2 * (1 - circleProgress);

  // Score number
  const rawScore = interpolate(frame, [20, 100], [0, 87], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const score = Math.floor(rawScore);

  // Build badge (105+)
  const badgeSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 12, stiffness: 120 }
  });
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);

  // Phase 3: Zoom on ring (110-150)
  const zoomProgress = interpolate(frame, [110, 150], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const zoomScale = interpolate(zoomProgress, [0, 1], [1.0, 1.5]);

  // Phase 4: Fade out (150-180)
  const fadeOutOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const currentScale = zoomScale;
  const currentOpacity = frame < 150 ? entranceOpacity : fadeOutOpacity;

  const metrics = [
    { label: 'Problem Validation', value: '94%', color: colors.blue, delay: 50 },
    { label: 'Market Demand', value: 'HIGH', color: colors.green, delay: 65 },
    { label: 'Competition Gap', value: 'MODERATE', color: colors.orange, delay: 80 },
    { label: 'Market Size', value: '$2.4B TAM', color: colors.blue, delay: 95 },
    { label: 'Time to MVP', value: '6–10 weeks', color: colors.white, delay: 110 },
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
        padding: 48,
        opacity: currentOpacity,
        transform: `scale(${entranceScale * currentScale})`,
        transformOrigin: '25% 50%'
      }}>
        <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 40, fontFamily: fonts.base }}>
          BLUEPRINT SCORE
        </div>

        <div style={{ display: 'flex', gap: 60, flex: 1 }}>
          {/* Left Side: Score Ring */}
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <div style={{ position: 'relative', width: 200, height: 200 }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke={colors.bgCard}
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke={colors.green}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="515.2"
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.base
              }}>
                {frame < 20 ? (
                  <div style={{ fontSize: 14, color: '#94A3B8' }}>Calculating...</div>
                ) : (
                  <div style={{ color: colors.white, fontSize: 60, fontWeight: 800 }}>
                    {score}<span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 400 }}>/100</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{
              background: 'rgba(34,197,94,0.12)',
              border: `2px solid ${colors.green}`,
              borderRadius: 10,
              padding: '10px 32px',
              fontSize: 24,
              fontWeight: 800,
              color: colors.green,
              fontFamily: fonts.base,
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`
            }}>
              BUILD
            </div>
          </div>

          {/* Right Side: Metrics */}
          <div style={{ flex: 1 }}>
            {metrics.map((m, i) => (
              <MetricRow key={i} {...m} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
