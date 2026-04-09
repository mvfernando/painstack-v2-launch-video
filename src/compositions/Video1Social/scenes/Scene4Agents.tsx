
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
  const glint = interpolate(frame, [delay, delay + 20], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: '16px',
      opacity,
      transform: `translateY(${interpolate(prog, [0, 1], [30, 0])}px)`,
      boxShadow: `0 15px 45px rgba(0,0,0,0.4), 0 0 ${glint * 40}px ${colors.blue}${Math.floor(glint * 255).toString(16).padStart(2, '0')}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ fontFamily: fonts.base, fontSize: 13, color: colors.white, lineHeight: 1.4, marginBottom: 8, fontWeight: 500 }}>
        "{text}"
      </div>
      <div style={{ fontFamily: fonts.base, fontSize: 12, color: colors.orange, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
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
          boxShadow: `0 0 10px ${colors.blue}`
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

  // Identify which step is active for brain pulsing
  const activeStepIdx = steps.findIndex(s => frame >= s.delay && frame < s.delay + 35);
  const brainPulse = activeStepIdx !== -1 ? Math.sin(frame / 4) * 0.3 + 0.7 : 0.4;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0F172A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <AbsoluteFill style={{ 
        backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(45,129,224,0.08) 0%, transparent 80%)`,
      }} />

      {/* Directed Data Flux Particles */}
      {[...Array(20)].map((_, i) => {
          const delay = (i * 153) % 200;
          const particleP = (frame + delay) % 150;
          const particleOpacity = interpolate(particleP, [0, 20, 130, 150], [0, 0.4, 0.4, 0]);
          const particleX = interpolate(particleP, [0, 150], [120, -20]);
          const particleY = (i * 123) % 100;

          return (
              <div key={i} style={{
                  position: 'absolute',
                  width: 3,
                  height: 3,
                  borderRadius: '100%',
                  background: colors.blue,
                  left: `${particleX}%`,
                  top: `${particleY}%`,
                  opacity: particleOpacity,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 8px ${colors.blue}`
              }} />
          )
      })}

      <div style={{
        display: 'flex',
        gap: 60,
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        zIndex: 1,
        alignItems: 'center',
      }}>
        {/* Left: Processing steps */}
        <div style={{
          width: 480,
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: `1px solid ${colors.border}`,
          padding: '40px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
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
              opacity: 0.3,
              boxShadow: `0 0 20px ${colors.blue}`,
              zIndex: 10
          }} />

          {/* Brain / Core Section */}
          <div style={{
            position: 'relative',
            width: 80,
            height: 80,
            margin: '0 auto 40px',
          }}>
            <div style={{
                position: 'absolute',
                inset: -30,
                background: `radial-gradient(circle, ${colors.blue}66 0%, transparent 70%)`,
                opacity: brainPulse,
            }} />
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 1)',
                border: `2px solid ${colors.blue}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                position: 'relative',
                boxShadow: `0 0 30px ${colors.blue}44`,
                transform: `scale(${1 + (brainPulse - 0.4) * 0.1})`
            }}>
                🧠
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((step, i) => {
              const isActive = frame >= step.delay && frame < step.delay + 35;
              const isDone = frame >= step.delay + 35;
              const stepOpacity = interpolate(frame, [step.delay, step.delay + 10], [0.2, 1], { extrapolateRight: 'clamp' });

              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: '14px 20px',
                  borderRadius: 14,
                  background: isActive ? 'rgba(45,129,224,0.15)' : 'transparent',
                  border: isActive ? `1px solid ${colors.blue}66` : '1px solid transparent',
                  opacity: frame < step.delay ? 0.2 : stepOpacity,
                  transform: isActive ? 'translateX(6px)' : 'none',
                  transition: 'transform 0.2s ease-out, background 0.2s ease'
                }}>
                  <div style={{ fontSize: 24 }}>{step.icon}</div>
                  <div style={{
                    fontFamily: fonts.base,
                    fontSize: 18,
                    color: isDone ? colors.muted : isActive ? colors.white : colors.muted,
                    fontWeight: isActive ? 700 : 500,
                    flex: 1,
                  }}>
                    {step.label}
                  </div>
                  {isDone && (
                    <div style={{ color: colors.green, fontSize: 22, fontWeight: 900 }}>✓</div>
                  )}
                  {isActive && (
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: colors.blue,
                      boxShadow: `0 0 15px ${colors.blue}`,
                      opacity: Math.round(frame / 6) % 2 === 0 ? 1 : 0.3,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Reddit evidence cards with cinematic cascade */}
        <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            fontFamily: fonts.base,
            fontSize: 14,
            fontWeight: 900,
            color: colors.orange,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: 8,
            opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            Real-time Evidence
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
