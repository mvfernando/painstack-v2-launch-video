
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, fonts } from '../../../shared/brand';
import { Briefcase, TrendingUp, Code2, ShieldCheck } from 'lucide-react';

const AgentCard = ({ 
  icon, 
  name, 
  desc, 
  accent, 
  delay, 
  theme = 'dark',
  isVertical = false
}: { 
  icon: React.ReactNode; 
  name: string; 
  desc: string; 
  accent: string; 
  delay: number;
  theme?: 'light' | 'dark';
  isVertical?: boolean;
}) => {
  const frame = useCurrentFrame();
  const isLight = theme === 'light';
  
  const themeColors = {
    card: isLight ? colors.lightBg : colors.bgCard,
    text: isLight ? colors.lightText : colors.white,
    muted: isLight ? colors.lightMuted : colors.muted,
    border: isLight ? colors.lightBorder : colors.border,
    bgIcon: isLight ? `${accent}15` : `${accent}22`,
  };

  // Micro-animation: soft floating effect based on delay
  const float = interpolate(
    Math.sin((frame - delay) / 15),
    [-1, 1],
    [-2, 2]
  );
  
  // Icon pulse effect
  const pulse = interpolate(
    Math.sin((frame - delay) / 20),
    [-1, 1],
    [0.9, 1.1]
  );

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(20px)',
      borderRadius: 24,
      padding: isVertical ? "24px 28px" : "32px",
      border: `1px solid rgba(255, 255, 255, 0.06)`,
      borderTop: `1px solid rgba(255, 255, 255, 0.12)`,
      display: "flex",
      alignItems: "center",
      gap: isVertical ? 24 : 24,
      opacity: interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      transform: `scale(${interpolate(frame, [delay, delay + 20], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}) translateY(${float}px)`,
      boxShadow: isLight ? "0 10px 30px rgba(0,0,0,0.04)" : "0 20px 50px rgba(0,0,0,0.4)"
    }}>
      <div style={{ 
        width: isVertical ? 64 : 64, 
        height: isVertical ? 64 : 64, 
        borderRadius: 16, 
        background: themeColors.bgIcon,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: accent, // Pass accent color to Lucide icon
        flexShrink: 0,
        transform: `scale(${pulse})`,
        border: `1px solid ${accent}44`,
        boxShadow: `0 0 15px ${accent}22 inset`
      }}>
        {icon}
      </div>

      <div>
        <div style={{ fontSize: isVertical ? 24 : 24, fontWeight: 800, color: themeColors.text, marginBottom: 4, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: isVertical ? 16 : 15, color: themeColors.muted, lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  );
};

export const ExecutiveTeamScene = ({ 
  theme = 'dark', 
  title = "Your AI Executive Team",
  cardWidth = "100%" 
}: {
  theme?: 'light' | 'dark';
  title?: string;
  cardWidth?: string;
}) => {
  const { width, height } = useVideoConfig();
  const isLight = theme === 'light';
  const isVertical = height > width;

  const iconSize = isVertical ? 32 : 32;

  const agents = [
    { 
      name: "Strategic Lead", 
      role: "CEO Engine", 
      icon: <Briefcase size={iconSize} strokeWidth={2.5} />, 
      accent: colors.orange,
      description: "Vision & Market Strategy",
      delay: 20 
    },
    { 
      name: "Market Analyst", 
      role: "CMO Engine", 
      icon: <TrendingUp size={iconSize} strokeWidth={2.5} />, 
      accent: colors.blue,
      description: "Data-driven Growth",
      delay: 35 
    },
    { 
      name: "System Architect", 
      role: "CTO Engine", 
      icon: <Code2 size={iconSize} strokeWidth={2.5} />, 
      accent: colors.purple,
      description: "Architecture & Tech Stack",
      delay: 50 
    },
    { 
      name: "Risk Controller", 
      role: "CFO Engine", 
      icon: <ShieldCheck size={iconSize} strokeWidth={2.5} />, 
      accent: colors.green,
      description: "Financial Viability",
      delay: 65 
    }
  ];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: isLight ? colors.lightBgProduct : colors.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isVertical ? 40 : 40,
      fontFamily: fonts.base
    }}>
      <div style={{ 
        width: cardWidth,
        maxWidth: isVertical ? '100%' : 1100,
        display: 'flex',
        flexDirection: 'column',
        gap: isVertical ? 48 : 48
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: isVertical ? 18 : 14, 
            fontWeight: 700, 
            color: colors.orange, 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            marginBottom: 12 
          }}>POWERED BY PAINSTACK</div>
          <h2 style={{ 
            fontSize: isVertical ? 48 : 56, 
            fontWeight: 900, 
            color: isLight ? colors.lightText : colors.white, 
            letterSpacing: '-2px',
            lineHeight: 1
          }}>{title}</h2>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isVertical ? "1fr" : "1fr 1fr", 
          gap: isVertical ? 16 : 32 
        }}>
          {agents.map((agent, i) => (
            <AgentCard 
                key={i} 
                icon={agent.icon} 
                name={agent.name} 
                desc={agent.description} 
                accent={agent.accent} 
                delay={agent.delay} 
                theme={theme} 
                isVertical={isVertical} 
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
