import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const CALC_FRAMES = 20;

export const Scene5Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isCalculating = frame < CALC_FRAMES;

  // Score counter 0 → 87, starts after frame 20
  const scoreProgress = interpolate(frame, [CALC_FRAMES, 90], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const score = Math.round(scoreProgress * 87);

  // Verdict entrance
  const verdictScale = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 100, mass: 1 } });
  const verdictOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });

  // Sub items
  const items = [
    { label: 'Problem Validation', value: '94%', delay: 50 },
    { label: 'Market Demand', value: 'HIGH', delay: 65 },
    { label: 'Competition Gap', value: 'MODERATE', delay: 80 },
    { label: 'Evidence Sources', value: '847 posts', delay: 95 },
  ];

  // Arc progress for score ring
  const arcProgress = scoreProgress;

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 40,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 60, zIndex: 1 }}>
        {/* Verdict badge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: verdictOpacity,
          transform: `scale(${verdictScale})`,
        }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 14,
            fontWeight: 600,
            color: colors.muted,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Blueprint Score
          </div>

          {/* Score ring */}
          <div style={{ position: 'relative', width: 180, height: 180 }}>
            <svg width={180} height={180} viewBox="0 0 180 180">
              {/* Track */}
              <circle cx={90} cy={90} r={75} fill="none" stroke={colors.bgLight} strokeWidth={10} />
              {/* Progress */}
              <circle
                cx={90} cy={90} r={75}
                fill="none"
                stroke={colors.green}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 75}`}
                strokeDashoffset={`${2 * Math.PI * 75 * (1 - arcProgress)}`}
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 2,
            }}>
              {isCalculating ? (
                <div style={{ fontFamily: fonts.base, fontSize: 16, color: colors.muted, fontWeight: 500 }}>
                  Calculating...
                </div>
              ) : (
                <>
                  <div style={{
                    fontFamily: fonts.base,
                    fontSize: 52,
                    fontWeight: 800,
                    color: colors.white,
                    letterSpacing: '-2px',
                    lineHeight: 1,
                  }}>
                    {score}
                  </div>
                  <div style={{ fontFamily: fonts.base, fontSize: 13, color: colors.muted }}>/100</div>
                </>
              )}
            </div>
          </div>

          {/* VERDICT */}
          <div style={{
            background: 'rgba(34,197,94,0.12)',
            border: `2px solid ${colors.green}`,
            borderRadius: 12,
            padding: '12px 40px',
            fontFamily: fonts.base,
            fontSize: 28,
            fontWeight: 800,
            color: colors.green,
            letterSpacing: '0.1em',
          }}>
            BUILD ✓
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 320 }}>
          {items.map((item, i) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            const itemX = interpolate(frame, [item.delay, item.delay + 20], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                background: colors.bgCard,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}>
                <div style={{ fontFamily: fonts.base, fontSize: 14, color: colors.muted }}>{item.label}</div>
                <div style={{ fontFamily: fonts.base, fontSize: 15, fontWeight: 700, color: colors.blue }}>{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
