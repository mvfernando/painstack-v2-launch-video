
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const evidence = [
  { text: "Anyone else struggling with...", upvotes: "1.2k", x: 25, y: 25, delay: 90 },
  { text: "I'd pay $50/mo for a tool that...", upvotes: "842", x: 75, y: 30, delay: 110 },
  { text: "Spent 4 months building, no users.", upvotes: "2.1k", x: 30, y: 75, delay: 130 },
  { text: "Is there a better way to...", upvotes: "430", x: 70, y: 70, delay: 150 },
];

const EvidenceCard = ({ text, upvotes, x, y, delay }: { text: string; upvotes: string; x: number; y: number; delay: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
    const drift = Math.sin((frame - delay) / 30) * 10;
    
    if (frame < delay) return null;

    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${entrance}) translateY(${drift}px)`,
            background: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: '16px 24px',
            width: 320,
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            zIndex: 5
        }}>
            <div style={{ color: colors.white, fontSize: 14, fontFamily: fonts.base, marginBottom: 8, lineHeight: 1.4 }}>
                "{text}"
            </div>
            <div style={{ color: colors.orange, fontSize: 12, fontWeight: 800, fontFamily: fonts.base }}>
                ▲ {upvotes} · r/startups
            </div>
        </div>
    );
};

export const Scene2bBridge: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Headline animation
    const headlineProg = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.8 } });
    const headlineOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const headlineY = interpolate(headlineProg, [0, 1], [30, 0]);

    // Subtitle animation
    const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

    // Pills data
    const pills = [
        { label: '🔴 Reddit & communities', color: colors.orange, delay: 20 },
        { label: '📊 Market structure', color: colors.blue, delay: 38 },
        { label: '🏗️ Startup Blueprint', color: '#a78bfa', delay: 56 },
    ];

    // Footer text
    const footerOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });

    // Transition scaling for background (zooming into the data)
    const bgScale = interpolate(frame, [80, 200], [1, 1.2], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            background: colors.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 40,
            overflow: 'hidden'
        }}>
            {/* Background Atmosphere */}
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.1) 0%, transparent 70%)`,
                transform: `scale(${bgScale})`,
            }} />

            {/* Evidence Popcorn */}
            {evidence.map((ev, i) => (
                <EvidenceCard key={i} {...ev} />
            ))}

            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <div style={{
                    fontFamily: fonts.base,
                    fontSize: 56, // Slightly larger
                    fontWeight: 900, // Thicker
                    color: colors.white,
                    opacity: headlineOpacity,
                    transform: `translateY(${headlineY}px)`,
                    marginBottom: 10,
                    letterSpacing: '-2px',
                    textShadow: '0 0 40px rgba(0,0,0,1)'
                }}>
                    Painstack scans real communities.
                </div>
                <div style={{
                    fontFamily: fonts.base,
                    fontSize: 28,
                    color: colors.muted,
                    fontWeight: 500,
                    opacity: subtitleOpacity,
                    textShadow: '0 0 20px rgba(0,0,0,0.8)'
                }}>
                    Real evidence. Not guesses.
                </div>
            </div>

            <div style={{ display: 'flex', gap: 20, zIndex: 10 }}>
                {pills.map((pill, i) => {
                    const prog = spring({ frame: frame - pill.delay, fps, config: { damping: 18, stiffness: 130 } });
                    const opacity = interpolate(frame, [pill.delay, pill.delay + 15], [0, 1], { extrapolateRight: 'clamp' });
                    const scale = interpolate(prog, [0, 1], [0.8, 1]);

                    return (
                        <div key={i} style={{
                            background: colors.bgCard,
                            border: `1px solid ${pill.color}66`,
                            borderRadius: 100,
                            padding: '16px 32px',
                            fontFamily: fonts.base,
                            fontSize: 18,
                            fontWeight: 700,
                            color: colors.white,
                            opacity,
                            transform: `scale(${scale})`,
                            boxShadow: `0 15px 40px rgba(0,0,0,0.4)`,
                        }}>
                            {pill.label}
                        </div>
                    );
                })}
            </div>

            <div style={{
                fontFamily: fonts.base,
                fontSize: 18,
                color: colors.blue,
                fontWeight: 700,
                opacity: footerOpacity,
                marginTop: 30,
                zIndex: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
            }}>
                Validating market demand ↓
            </div>
        </AbsoluteFill>
    );
};
