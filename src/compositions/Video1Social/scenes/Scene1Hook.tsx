
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

    const entranceProgress = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
    const tilt = interpolate(entranceProgress, [0, 1], [10, 0]);
    
    const word1Progress = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
    const word1Y = interpolate(word1Progress, [0, 1], [60, 0]);
    const word1Opacity = interpolate(word1Progress, [0, 1], [0, 1]);

    const word2Progress = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100 } });
    const word2Y = interpolate(word2Progress, [0, 1], [60, 0]);
    const word2Opacity = interpolate(word2Progress, [0, 1], [0, 1]);

    const subtitleOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });
    const sweepPos = interpolate(frame % 90, [0, 90], [-100, 300]);

    return (
        <AbsoluteFill style={{ background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
            {/* Cinematic Background */}
            <AbsoluteFill style={{ 
                background: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.1) 0%, transparent 80%)`,
            }} />
            
            {/* Particles */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}
            
            {/* Vignette */}
            <AbsoluteFill style={{ 
                boxShadow: 'inset 0 0 300px rgba(0,0,0,0.8)',
                pointerEvents: 'none'
            }} />

            <div style={{ textAlign: 'center', zIndex: 1, perspective: 1000 }}>
                <div style={{ overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{
                        fontFamily: fonts.base,
                        fontSize: 110,
                        fontWeight: 900,
                        color: colors.white,
                        letterSpacing: '-5px',
                        opacity: word1Opacity,
                        transform: `translateY(${word1Y}px) rotateX(${tilt}deg)`,
                        lineHeight: 1,
                    }}>
                        Stop guessing.
                    </div>
                </div>

                <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                        fontFamily: fonts.base,
                        fontSize: 110,
                        fontWeight: 900,
                        background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.blue} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-5px',
                        opacity: word2Opacity,
                        transform: `translateY(${word2Y}px) rotateX(${tilt}deg)`,
                        lineHeight: 1,
                        position: 'relative'
                    }}>
                        Start building.
                        
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: `${sweepPos}%`,
                            width: '40%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            transform: 'skewX(-25deg)',
                            pointerEvents: 'none',
                            mixBlendMode: 'overlay'
                        }} />
                    </div>
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
