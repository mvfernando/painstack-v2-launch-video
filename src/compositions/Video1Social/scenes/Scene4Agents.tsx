import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const steps = [
  { icon: '🔍', label: 'Fetching Reddit discussions...', delay: 0 },
  { icon: '🧠', label: 'Analyzing the problem...', delay: 35 },
  { icon: '💡', label: 'Generating solutions...', delay: 70 },
  { icon: '📋', label: 'Building your blueprint...', delay: 105 },
];

const RedditCard: React.FC<{ text: string; upvotes: string; delay: number }> = ({ text, upvotes, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 130, mass: 0.8 } });
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      background: 'rgba(45,129,224,0.08)',
      border: `1px solid rgba(45,129,224,0.2)`,
      borderRadius: 10,
      padding: '12px 16px',
      opacity,
      transform: `translateY(${interpolate(prog, [0, 1], [20, 0])}px)`,
    }}>
      <div style={{ fontFamily: fonts.base, fontSize: 13, color: colors.white, lineHeight: 1.4, marginBottom: 6 }}>
        "{text}"
      </div>
      <div style={{ fontFamily: fonts.base, fontSize: 12, color: colors.orange }}>
        ▲ {upvotes} · r/startups
      </div>
    </div>
  );
};

export const Scene4Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const containerScale = spring({ frame, fps, config: { damping: 22, stiffness: 140, mass: 0.7 } });

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse at 60% 30%, rgba(45,129,224,0.06) 0%, transparent 60%)`,
      }} />

      <div style={{
        display: 'flex',
        gap: 32,
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        zIndex: 1,
        alignItems: 'flex-start',
      }}>
        {/* Left: Processing steps */}
        <div style={{
          width: 420,
          background: colors.bgCard,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          padding: '28px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Brain icon */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(45,129,224,0.15)',
            border: `2px solid rgba(45,129,224,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            margin: '0 auto 24px',
          }}>
            🧠
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {steps.map((step, i) => {
              const isActive = frame >= step.delay && frame < step.delay + 35;
              const isDone = frame >= step.delay + 35;
              const stepOpacity = interpolate(frame, [step.delay, step.delay + 15], [0.3, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: isActive ? 'rgba(45,129,224,0.12)' : 'transparent',
                  border: isActive ? `1px solid rgba(45,129,224,0.25)` : '1px solid transparent',
                  opacity: frame < step.delay ? 0.25 : stepOpacity,
                  transition: 'all 0.3s',
                }}>
                  <div style={{ fontSize: 18 }}>{step.icon}</div>
                  <div style={{
                    fontFamily: fonts.base,
                    fontSize: 15,
                    color: isDone ? colors.muted : isActive ? colors.white : colors.muted,
                    fontWeight: isActive ? 500 : 400,
                    flex: 1,
                  }}>
                    {step.label}
                  </div>
                  {isDone && (
                    <div style={{ color: colors.green, fontSize: 14, fontWeight: 700 }}>✓</div>
                  )}
                  {isActive && (
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: colors.blue,
                      opacity: Math.round(frame / 8) % 2 === 0 ? 1 : 0.4,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Reddit evidence cards */}
        <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 12,
            fontWeight: 600,
            color: colors.orange,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 4,
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            Real evidence found
          </div>
          <RedditCard
            text="I've been building for 6 months and just realized nobody actually wants this feature."
            upvotes="847"
            delay={30}
          />
          <RedditCard
            text="How do you validate an idea without spending money? I keep building things nobody uses."
            upvotes="1.2k"
            delay={65}
          />
          <RedditCard
            text="Spent $40k and 8 months building. Got 3 users. I should have validated first."
            upvotes="2.4k"
            delay={100}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
