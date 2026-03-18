
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const RoadmapPhase = ({ phase, title, weeks, status, items, delay }: { 
  phase: string; 
  title: string; 
  weeks: string; 
  status: string; 
  items: string[];
  delay: [number, number];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 2. As 3 fases do roadmap entram em stagger da esquerda (translateX -40px→0)
  const entrance = interpolate(frame, [delay[0], delay[1]], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = interpolate(entrance, [0, 1], [-40, 0]);

  const isActive = status === "active";

  // 4. A Phase 2 (Active) tem border azul com glow pulsante: a cada 25 frames
  const glowPulse = interpolate(
    Math.sin((frame / 25) * Math.PI),
    [-1, 1],
    [0.12, 0.22]
  );
  
  const boxShadow = isActive 
    ? `0 0 ${interpolate(glowPulse, [0.12, 0.22], [16, 28])}px rgba(45,129,224,${glowPulse})` 
    : "none";

  // 5. Os badges de status entram 10 frames depois do respectivo card
  const badgeEntrance = spring({ frame: frame - delay[0] - 10, fps, config: { damping: 12 } });

  return (
    <div style={{ 
      flex: 1, 
      background: colors.bgCard, 
      borderRadius: 14, 
      border: `1px solid ${isActive ? colors.blue + "66" : colors.border}`, 
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
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{phase}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: colors.white, lineHeight: 1.3 }}>{title}</div>
        </div>
        <div style={{ 
          fontSize: 11, 
          fontWeight: 700, 
          padding: "4px 10px", 
          borderRadius: 100, 
          background: status === "done" ? "rgba(34,197,94,0.12)" : status === "active" ? "rgba(45,129,224,0.12)" : "rgba(148,163,184,0.1)", 
          color: status === "done" ? colors.green : status === "active" ? colors.blue : colors.muted, 
          border: `1px solid ${status === "done" ? colors.green + "44" : status === "active" ? colors.blue + "44" : colors.border}`,
          opacity: badgeEntrance,
          transform: `scale(${badgeEntrance})`
        }}>
          {status === "done" ? "✓ Done" : status === "active" ? "● Active" : "○ Next"}
        </div>
      </div>
      <div style={{ fontSize: 13, color: colors.orange, marginBottom: 16, fontWeight: 600 }}>⏱ {weeks}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, j) => {
          // 3. Dentro de cada card, os items entram sequencialmente (1 item de 8 em 8 frames) após o card aparecer
          const itemEntrance = spring({ frame: frame - delay[0] - 15 - j * 8, fps, config: { damping: 15 } });
          return (
            <div key={j} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 10, 
              fontSize: 14, 
              color: status === "done" ? colors.muted : colors.white,
              opacity: itemEntrance,
              transform: `translateX(${interpolate(itemEntrance, [0, 1], [-10, 0])}px)`
            }}>
              <span style={{ color: status === "done" ? colors.green : status === "active" ? colors.blue : colors.muted, fontSize: 10 }}>
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

export const RoadmapScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phases = [
    { phase: "Phase 1", title: "Validation & MVP Scope", weeks: "Weeks 1–2", status: "done", items: ["Problem interviews (5–10)", "Define core features", "Tech stack decision", "Wireframes"], delay: [20, 45] as [number, number] },
    { phase: "Phase 2", title: "Build MVP", weeks: "Weeks 3–8", status: "active", items: ["Auth + onboarding", "Core feature v1", "Basic analytics", "Internal testing"], delay: [35, 60] as [number, number] },
    { phase: "Phase 3", title: "Launch & GTM", weeks: "Weeks 9–10", status: "upcoming", items: ["Product Hunt launch", "LinkedIn outreach", "First 100 users", "Feedback loop"], delay: [50, 75] as [number, number] },
  ];

  // 1. Frame 0–20: label + título fade + slide-up
  const headerEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerY = interpolate(headerEntrance, [0, 1], [15, 0]);

  return (
    <AbsoluteFill style={{ 
      background: colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 40
    }}>
      <div style={{ 
        background: colors.bg, 
        border: `1px solid ${colors.border}`, 
        borderRadius: 24, 
        padding: "48px", 
        width: "100%", 
        height: "100%",
        boxSizing: "border-box",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        fontFamily: fonts.base
      }}>
        <div style={{ 
          marginBottom: 32,
          opacity: headerEntrance,
          transform: `translateY(${headerY}px)`
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: colors.purple, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Build Roadmap</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: colors.white, letterSpacing: "-0.5px" }}>From MVP to Launch</div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {phases.map((phase, i) => (
            <RoadmapPhase key={i} {...phase} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
