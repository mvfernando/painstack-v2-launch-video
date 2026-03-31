
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';


const RoadmapPhase = ({ 
  phase, 
  title, 
  weeks, 
  status, 
  items, 
  delay,
  theme = 'dark' 
}: { 
  phase: string; 
  title: string; 
  weeks: string; 
  status: string; 
  items: string[];
  delay: [number, number];
  theme?: 'light' | 'dark';
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isLight = theme === 'light';
  
  const entrance = interpolate(frame, [delay[0], delay[1]], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = interpolate(entrance, [0, 1], [-40, 0]);

  const isActive = status === "active";
  const themeColors = {
    card: isLight ? colors.lightBg : colors.bgCard,
    text: isLight ? colors.lightText : colors.white,
    muted: isLight ? colors.lightMuted : colors.muted,
    border: isLight ? colors.lightBorder : colors.border,
  };

  const glowPulse = interpolate(
    Math.sin((frame / 25) * Math.PI),
    [-1, 1],
    [0.12, 0.22]
  );
  
  const boxShadow = isActive && !isLight
    ? `0 0 ${interpolate(glowPulse, [0.12, 0.22], [16, 28])}px rgba(45,129,224,${glowPulse})` 
    : isLight && isActive ? "0 10px 30px rgba(249, 115, 22, 0.15)" : "none";

  const badgeEntrance = spring({ frame: frame - delay[0] - 10, fps, config: { damping: 12 } });

  return (
    <div style={{ 
      flex: 1, 
      background: themeColors.card, 
      borderRadius: 14, 
      border: `1px solid ${isActive ? (isLight ? colors.orange : colors.blue) + "66" : themeColors.border}`, 
      padding: "24px", 
      boxShadow,
      opacity: entrance,
      transform: `translateX(${x}px)`,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: themeColors.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{phase}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: themeColors.text, lineHeight: 1.3 }}>{title}</div>
        </div>
        <div style={{ 
          fontSize: 11, 
          fontWeight: 700, 
          padding: "4px 10px", 
          borderRadius: 100, 
          background: status === "done" ? "rgba(34,197,94,0.12)" : status === "active" ? (isLight ? "rgba(249, 115, 22, 0.12)" : "rgba(45,129,224,0.12)") : "rgba(148,163,184,0.1)", 
          color: status === "done" ? colors.green : status === "active" ? (isLight ? colors.orange : colors.blue) : themeColors.muted, 
          border: `1px solid ${status === "done" ? colors.green + "44" : status === "active" ? (isLight ? colors.orange : colors.blue) + "44" : themeColors.border}`,
          opacity: badgeEntrance,
          transform: `scale(${badgeEntrance})`
        }}>
          {status === "done" ? "✓ Done" : status === "active" ? "● Active" : "○ Next"}
        </div>
      </div>
      <div style={{ fontSize: 13, color: colors.orange, marginBottom: 16, fontWeight: 600 }}>{weeks}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, j) => {
          const itemEntrance = spring({ frame: frame - delay[0] - 15 - j * 8, fps, config: { damping: 15 } });
          return (
            <div key={j} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 10, 
              fontSize: 14, 
              color: status === "done" ? themeColors.muted : themeColors.text,
              opacity: itemEntrance,
              transform: `translateX(${interpolate(itemEntrance, [0, 1], [-10, 0])}px)`
            }}>
              <span style={{ color: status === "done" ? colors.green : status === "active" ? (isLight ? colors.orange : colors.blue) : themeColors.muted, fontSize: 10 }}>
                {status === "done" ? "✓" : status === "active" ? "●" : "○"}
              </span>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RoadmapScene: React.FC<{
  theme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  phases?: any[];
  progress?: number;
  cardWidth?: string;
}> = ({
  theme = 'dark',
  title = "Build Roadmap",
  subtitle = "From MVP to Launch",
  phases: customPhases,
  progress,
  cardWidth = "100%"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isLight = theme === 'light';

  const defaultPhases = [
    { phase: "Phase 1", title: "Validation & MVP Scope", weeks: "Weeks 1–2", status: "done", items: ["Problem interviews (5–10)", "Define core features", "Tech stack decision", "Wireframes"], delay: [20, 45] as [number, number] },
    { phase: "Phase 2", title: "Build MVP", weeks: "Weeks 3–8", status: "active", items: ["Auth + onboarding", "Core feature v1", "Basic analytics", "Internal testing"], delay: [35, 60] as [number, number] },
    { phase: "Phase 3", title: "Launch & GTM", weeks: "Weeks 9–10", status: "upcoming", items: ["Product Hunt launch", "LinkedIn outreach", "First 100 users", "Feedback loop"], delay: [50, 75] as [number, number] },
  ];

  const phases = customPhases || defaultPhases;

  const headerEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerY = interpolate(headerEntrance, [0, 1], [15, 0]);

  const progressVal = progress !== undefined ? interpolate(frame, [0, 60], [0, progress], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  return (
    <AbsoluteFill style={{ 
      background: isLight ? colors.lightBgProduct : colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 40
    }}>
      <div style={{ 
        background: isLight ? colors.lightBg : colors.bg, 
        border: `1px solid ${isLight ? colors.lightBorder : colors.border}`, 
        borderRadius: 24, 
        padding: "48px", 
        width: cardWidth, 
        height: cardWidth === "100%" ? "100%" : "auto",
        boxSizing: "border-box",
        boxShadow: isLight ? "0 20px 60px rgba(0,0,0,0.08)" : "0 40px 100px rgba(0,0,0,0.5)",
        fontFamily: fonts.base
      }}>
        <div style={{ 
          marginBottom: 32,
          opacity: headerEntrance,
          transform: `translateY(${headerY}px)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: isLight ? colors.orange : colors.purple, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: isLight ? colors.lightText : colors.white, letterSpacing: "-0.5px" }}>{subtitle}</div>
          </div>
          {progress !== undefined && (
            <div style={{ width: 300 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: isLight ? colors.lightMuted : colors.muted, marginBottom: 8 }}>
                <span>PROGRESS</span>
                <span>{Math.round(progressVal)}%</span>
              </div>
              <div style={{ height: 6, width: '100%', background: isLight ? colors.lightBorder : colors.border, borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressVal}%`, background: colors.orange, borderRadius: 10 }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {phases.map((phase, i) => (
            <RoadmapPhase key={i} {...phase} theme={theme} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
