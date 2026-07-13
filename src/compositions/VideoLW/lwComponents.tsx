/**
 * Launch Week — Shared Components
 * BG, IntroWord, FeatureTitle, Caption, BulletItem, CTACard, ProgressDots
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, staticFile } from 'remotion';
import { lwColors, lwFonts, lwGradients } from './lwBrand';

// ─────────────────────────────────────────────
// BG — Full-frame dark background with mesh gradient
// ─────────────────────────────────────────────
export const BG: React.FC = () => {
  const frame = useCurrentFrame();
  // Subtle slow breathing on the gradient
  const breathe = Math.sin(frame / 90) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: lwColors.bg, overflow: 'hidden' }}>
      {/* Mesh gradient: orange blob lower-left */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '65%',
        height: '65%',
        background: 'radial-gradient(ellipse at center, rgba(249,100,38,0.22) 0%, transparent 70%)',
        filter: 'blur(80px)',
        transform: `scale(${breathe})`,
      }} />
      {/* Blue blob lower-right */}
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(45,129,224,0.20) 0%, transparent 70%)',
        filter: 'blur(90px)',
        transform: `scale(${1 / breathe})`,
      }} />
      {/* Pink blob center-lower */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '30%',
        width: '50%',
        height: '40%',
        background: 'radial-gradient(ellipse at center, rgba(224,64,251,0.12) 0%, transparent 70%)',
        filter: 'blur(100px)',
      }} />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// ProgressDots — Day 1..5 indicator at top
// ─────────────────────────────────────────────
export const ProgressDots: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      opacity,
      zIndex: 10,
    }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          width: i === index ? 28 : 8,
          height: 8,
          borderRadius: 4,
          background: i === index ? lwColors.orange : 'rgba(255,255,255,0.2)',
        }} />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// IntroWord — "Introducing" gray label
// ─────────────────────────────────────────────
export const IntroWord: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const prog = spring({ frame: frame - startFrame, fps: 30, config: { damping: 18, stiffness: 120 } });
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const y = interpolate(prog, [0, 1], [16, 0]);

  return (
    <div style={{
      fontFamily: lwFonts.base,
      fontSize: 22,
      fontWeight: 600,
      color: lwColors.introGray,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      opacity,
      transform: `translateY(${y}px)`,
      marginBottom: 16,
      textAlign: 'center',
    }}>
      Introducing
    </div>
  );
};

// ─────────────────────────────────────────────
// FeatureTitle — Large feature name with gradient accent word
// ─────────────────────────────────────────────
export const FeatureTitle: React.FC<{
  text: string;
  accentWord?: string; // word(s) to apply gradient to
  gradient?: keyof typeof lwGradients;
  startFrame?: number;
}> = ({ text, accentWord, gradient = 'hub', startFrame = 8 }) => {
  const frame = useCurrentFrame();
  const prog = spring({ frame: frame - startFrame, fps: 30, config: { damping: 16, stiffness: 100, mass: 0.8 } });
  const scale = interpolate(prog, [0, 1], [0.92, 1]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  const grad = lwGradients[gradient];

  if (accentWord) {
    const parts = text.split(accentWord);
    return (
      <div style={{
        fontFamily: lwFonts.base,
        fontWeight: 900,
        fontSize: 72,
        lineHeight: 1.05,
        letterSpacing: '-2px',
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}>
        <span style={{ color: lwColors.white }}>{parts[0]}</span>
        <span style={{
          background: grad,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>{accentWord}</span>
        <span style={{ color: lwColors.white }}>{parts[1]}</span>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: lwFonts.base,
      fontWeight: 900,
      fontSize: 72,
      lineHeight: 1.05,
      letterSpacing: '-2px',
      textAlign: 'center',
      background: grad,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      opacity,
      transform: `scale(${scale})`,
    }}>
      {text}
    </div>
  );
};

// ─────────────────────────────────────────────
// Caption — Bottom-third kinetic caption synced to VO
// ─────────────────────────────────────────────
export const Caption: React.FC<{
  text: string;
  startFrame: number;
  endFrame?: number;
}> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const inProg = spring({ frame: frame - startFrame, fps: 30, config: { damping: 20, stiffness: 150 } });
  const opacity = endFrame
    ? interpolate(frame, [startFrame, startFrame + 8, endFrame - 8, endFrame], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : interpolate(frame, [startFrame, startFrame + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(inProg, [0, 1], [12, 0]);

  return (
    <div style={{
      position: 'absolute',
      bottom: 120,
      left: 40,
      right: 40,
      textAlign: 'center',
      opacity,
      transform: `translateY(${y}px)`,
      zIndex: 20,
    }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        borderRadius: 12,
        padding: '14px 24px',
        fontFamily: lwFonts.base,
        fontSize: 26,
        fontWeight: 700,
        color: lwColors.white,
        lineHeight: 1.35,
        maxWidth: 880,
        letterSpacing: '-0.3px',
      }}>
        {text}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// BulletItem — Single line + icon staggered entrance
// ─────────────────────────────────────────────
export const BulletItem: React.FC<{
  text: string;
  icon: string;
  startFrame: number;
  accent?: string;
}> = ({ text, icon, startFrame, accent = lwColors.orange }) => {
  const frame = useCurrentFrame();
  const prog = spring({ frame: frame - startFrame, fps: 30, config: { damping: 18, stiffness: 130 } });
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const x = interpolate(prog, [0, 1], [-20, 0]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      opacity,
      transform: `translateX(${x}px)`,
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${accent}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: 28,
        fontWeight: 700,
        color: lwColors.white,
        lineHeight: 1.3,
      }}>
        {text}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CTACard — Final CTA slide
// ─────────────────────────────────────────────
export const CTACard: React.FC<{
  tagline?: string;
  startFrame?: number;
}> = ({ tagline, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const prog = spring({ frame: frame - startFrame, fps: 30, config: { damping: 18, stiffness: 100 } });
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const scale = interpolate(prog, [0, 1], [0.94, 1]);

  return (
    <AbsoluteFill style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      opacity,
      transform: `scale(${scale})`,
    }}>
      <Img
        src={staticFile('shared/Painstack.ai_logo2.png')}
        style={{ width: 200, height: 'auto' }}
      />
      {tagline && (
        <div style={{
          fontFamily: lwFonts.base,
          fontSize: 28,
          fontWeight: 600,
          color: lwColors.introGray,
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.4,
          letterSpacing: '-0.3px',
        }}>
          {tagline}
        </div>
      )}
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: 52,
        fontWeight: 900,
        color: lwColors.white,
        letterSpacing: '-1.5px',
        textAlign: 'center',
      }}>
        usepainstackai.com
      </div>
      <div style={{
        display: 'inline-block',
        padding: '16px 48px',
        borderRadius: 100,
        background: 'linear-gradient(135deg, #f96426, #2d81e0)',
        fontFamily: lwFonts.base,
        fontSize: 22,
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '0.04em',
      }}>
        Try it free →
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// UIPlaceholder — Animated UI mock (replaces .mov clips)
// ─────────────────────────────────────────────
export const UIPlaceholder: React.FC<{
  title: string;
  rows?: number;
  accentColor?: string;
  startFrame?: number;
}> = ({ title, rows = 4, accentColor = lwColors.orange, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const prog = spring({ frame: frame - startFrame, fps: 30, config: { damping: 18, stiffness: 100 } });
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const scale = interpolate(prog, [0, 1], [0.96, 1]);
  const scanPos = interpolate(frame % 60, [0, 60], [0, 100]);

  return (
    <div style={{
      width: '100%',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 28,
      opacity,
      transform: `scale(${scale})`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scanning line */}
      <div style={{
        position: 'absolute',
        top: `${scanPos}%`,
        left: 0,
        width: '100%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`,
        opacity: 0.5,
      }} />

      {/* Header */}
      <div style={{
        fontFamily: lwFonts.base,
        fontSize: 13,
        fontWeight: 700,
        color: accentColor,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: 20,
      }}>
        {title}
      </div>

      {/* Skeleton rows */}
      {Array.from({ length: rows }).map((_, i) => {
        const rowProg = spring({ frame: frame - startFrame - i * 8, fps: 30, config: { damping: 18 } });
        const rowOpacity = interpolate(rowProg, [0, 1], [0, 1]);
        const widths = [85, 70, 90, 60, 75, 80];
        return (
          <div key={i} style={{
            height: 14,
            borderRadius: 7,
            background: `rgba(255,255,255,0.08)`,
            width: `${widths[i % widths.length]}%`,
            marginBottom: 14,
            opacity: rowOpacity,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: `${(frame * 1.2 + i * 40) % 200 - 50}%`,
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            }} />
          </div>
        );
      })}
    </div>
  );
};
