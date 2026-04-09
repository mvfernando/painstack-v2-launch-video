
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const Particle = ({ delay, speed, x, y, size }: { delay: number; speed: number; x: number; y: number; size: number }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(Math.sin((frame - delay) / 20), [-1, 1], [0.1, 0.4]);
    const translateY = Math.sin((frame - delay) / speed) * 20;
    
    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: colors.blue,
            opacity,
            transform: `translateY(${translateY}px)`,
            filter: 'blur(1px)'
        }} />
    );
};

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const particles = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            delay: Math.random() * 100,
            speed: 30 + Math.random() * 40,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 4
        }));
    }, []);

    // === BLOOM POP-IN (same as Video4Product logo intro) ===
    // Line 1: "Stop guessing." — starts immediately
    const bloom1 = spring({ frame: Math.max(0, frame), fps, config: { stiffness: 300, damping: 25, mass: 0.5 } });
    const line1Blur = interpolate(frame, [0, 6], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line1Scale = interpolate(bloom1, [0, 1], [1.3, 1.0]);
    const line1Opacity = interpolate(frame, [0, 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Line 2: "Start building." — staggered 12 frames later
    const STAGGER = 12;
    const bloom2 = spring({ frame: Math.max(0, frame - STAGGER), fps, config: { stiffness: 300, damping: 25, mass: 0.5 } });
    const line2Blur = interpolate(frame, [STAGGER, STAGGER + 6], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Scale = interpolate(bloom2, [0, 1], [1.3, 1.0]);
    const line2Opacity = interpolate(frame, [STAGGER, STAGGER + 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const subtitleOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
            {/* Cinematic Background */}
            <AbsoluteFill style={{ 
                background: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.1) 0%, transparent 80%)`,
            }} />
            
            {/* Particles */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}
            


            <div style={{ textAlign: 'center', zIndex: 1 }}>
                {/* Line 1: Bloom Pop-In — no overflow:hidden, free in space */}
                <div style={{
                    fontFamily: fonts.base,
                    fontSize: 110,
                    fontWeight: 900,
                    color: colors.white,
                    letterSpacing: '-5px',
                    lineHeight: 1,
                    marginBottom: 8,
                    opacity: line1Opacity,
                    filter: `blur(${line1Blur}px)`,
                    transform: `scale(${line1Scale})`,
                    transformOrigin: 'center center',
                }}>
                    Stop guessing.
                </div>

                {/* Line 2: Bloom Pop-In staggered — no overflow:hidden, free */}
                <div style={{
                    fontFamily: fonts.base,
                    fontSize: 110,
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.blue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-5px',
                    lineHeight: 1,
                    position: 'relative',
                    opacity: line2Opacity,
                    filter: `blur(${line2Blur}px)`,
                    transform: `scale(${line2Scale})`,
                    transformOrigin: 'center center',
                }}>
                    Start building.
                </div>
            </div>

            <div style={{
                fontFamily: fonts.base,
                fontSize: 26,
                color: colors.muted,
                fontWeight: 600,
                letterSpacing: '0.15em',
                opacity: subtitleOpacity,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 30
            }}>
                <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: colors.orange,
                    boxShadow: `0 0 15px ${colors.orange}`,
                }} />
                PAINSTACK AI
            </div>
        </AbsoluteFill>
    );
};
