
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const AgentCard = ({ 
  icon, 
  name, 
  desc, 
  accent, 
  delay, 
  theme = 'dark',
  isVertical = false
}: { 
  icon: string; 
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
    card: isLight ? colors.lightBg : colors.bg,
    text: isLight ? colors.lightText : colors.white,
    muted: isLight ? colors.lightMuted : colors.muted,
    border: isLight ? colors.lightBorder : colors.border,
    bgIcon: isLight ? `${accent}15` : `${accent}22`,
  };

  return (
    <div style={{
      background: themeColors.card,
      borderRadius: 24,
      padding: isVertical ? "24px 28px" : "32px",
      border: `2px solid ${themeColors.border}`,
      display: "flex",
      alignItems: "center",
      gap: isVertical ? 24 : 24,
      opacity: interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      transform: `scale(${interpolate(frame, [delay, delay + 20], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
      boxShadow: isLight ? "0 10px 30px rgba(0,0,0,0.04)" : "0 20px 50px rgba(0,0,0,0.2)"
    }}>
      <div style={{ 
        width: isVertical ? 64 : 64, 
        height: isVertical ? 64 : 64, 
        borderRadius: 16, 
        background: themeColors.bgIcon,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isVertical ? 32 : 32,
        flexShrink: 0
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

  const agents = [
    { 
      name: "Strategic Lead", 
      role: "CEO Engine", 
      icon: "🎯", 
      accent: colors.orange,
      description: "Vision & Market Strategy",
      delay: 20 
    },
    { 
      name: "Market Analyst", 
      role: "CMO Engine", 
      icon: "📊", 
      accent: colors.blue,
      description: "Data-driven Growth",
      delay: 35 
    },
    { 
      name: "System Architect", 
      role: "CTO Engine", 
      icon: "⚙️", 
      accent: colors.purple,
      description: "Architecture & Tech Stack",
      delay: 50 
    },
    { 
      name: "Risk Controller", 
      role: "CFO Engine", 
      icon: "🛡️", 
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
