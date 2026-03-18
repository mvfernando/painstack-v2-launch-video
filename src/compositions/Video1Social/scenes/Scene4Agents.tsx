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
      background: 'rgba(30, 41, 59, 0.4)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: '16px',
      opacity,
      transform: `translateY(${interpolate(prog, [0, 1], [20, 0])}px)`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ fontFamily: fonts.base, fontSize: 13, color: colors.white, lineHeight: 1.4, marginBottom: 8, fontWeight: 400 }}>
        "{text}"
      </div>
      <div style={{ fontFamily: fonts.base, fontSize: 12, color: colors.orange, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 14 }}>▲</span> {upvotes} · r/startups
      </div>
      
      {/* Evidence Highlight */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          background: colors.blue,
      }} />
    </div>
  );
};

export const Scene4Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const containerScale = spring({ frame, fps, config: { damping: 22, stiffness: 140, mass: 0.7 } });

  // Scanning line position
  const scanPos = interpolate(frame % 45, [0, 45], [0, 100]);

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0F172A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background radial highlight */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse at 60% 30%, rgba(45,129,224,0.12) 0%, transparent 60%)`,
      }} />

      {/* Data Particles */}
      {[...Array(15)].map((_, i) => {
          const particleOpacity = interpolate((frame + i * 20) % 100, [0, 20, 80, 100], [0, 0.3, 0.3, 0]);
          return (
              <div key={i} style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: colors.blue,
                  left: `${(i * 137) % 100}%`,
                  top: `${(i * 149) % 100}%`,
                  opacity: particleOpacity,
                  filter: 'blur(1px)'
              }} />
          )
      })}

      <div style={{
        display: 'flex',
        gap: 40,
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        zIndex: 1,
        alignItems: 'flex-start',
      }}>
        {/* Left: Processing steps */}
        <div style={{
          width: 450,
          background: colors.bgCard,
          borderRadius: 24,
          border: `1px solid ${colors.border}`,
          padding: '32px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Scanning Line overlay */}
          <div style={{
              position: 'absolute',
              top: `${scanPos}%`,
              left: 0,
              width: '100%',
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
              opacity: 0.4,
              boxShadow: `0 0 15px ${colors.blue}`,
              zIndex: 10
          }} />

          {/* Brain icon with Glow */}
          <div style={{
            position: 'relative',
            width: 72,
            height: 72,
            margin: '0 auto 32px',
          }}>
            <div style={{
                position: 'absolute',
                inset: -20,
                background: `radial-gradient(circle, ${colors.blue}44 0%, transparent 70%)`,
                opacity: Math.sin(frame / 6) * 0.2 + 0.5,
            }} />
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.8)',
                border: `2px solid ${colors.blue}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                position: 'relative',
                boxShadow: `0 0 20px ${colors.blue}33`
            }}>
                🧠
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {steps.map((step, i) => {
              const isActive = frame >= step.delay && frame < step.delay + 35;
              const isDone = frame >= step.delay + 35;
              const stepOpacity = interpolate(frame, [step.delay, step.delay + 15], [0.3, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(45,129,224,0.12)' : 'transparent',
                  border: isActive ? `1px solid ${colors.blue}44` : '1px solid transparent',
                  opacity: frame < step.delay ? 0.25 : stepOpacity,
                  transform: isActive ? 'translateX(4px)' : 'none',
                }}>
                  <div style={{ fontSize: 20 }}>{step.icon}</div>
                  <div style={{
                    fontFamily: fonts.base,
                    fontSize: 17,
                    color: isDone ? colors.muted : isActive ? colors.white : colors.muted,
                    fontWeight: isActive ? 600 : 400,
                    flex: 1,
                  }}>
                    {step.label}
                  </div>
                  {isDone && (
                    <div style={{ color: colors.green, fontSize: 18, fontWeight: 900 }}>✓</div>
                  )}
                  {isActive && (
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: colors.blue,
                      boxShadow: `0 0 10px ${colors.blue}`,
                      opacity: Math.round(frame / 6) % 2 === 0 ? 1 : 0.4,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Reddit evidence cards */}
        <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 13,
            fontWeight: 800,
            color: colors.orange,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
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
