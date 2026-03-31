
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, fonts } from '../../../shared/brand';

export const AgentCard = ({ 
  icon, 
  name, 
  desc, 
  accent, 
  delay, 
  theme = 'dark',
  isActive = false
}: {
  icon: string;
  name: string;
  desc: string;
  accent: string;
  delay: number;
  theme?: 'light' | 'dark';
  isActive?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isLight = theme === 'light';

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  
  const pulse = Math.sin(frame / 6) * 0.02 + 1;
  const themeColors = {
    card: isLight ? colors.lightBg : colors.bgCard,
    text: isLight ? colors.lightText : colors.white,
    muted: isLight ? colors.lightMuted : colors.muted,
    border: isLight ? colors.lightBorder : colors.border,
    bgIcon: isLight ? `${accent}15` : `${accent}22`,
  };

  return (
    <div style={{
      background: themeColors.card,
      borderRadius: 24,
      padding: 32,
      border: `2px solid ${isActive ? accent : themeColors.border}`,
      opacity: entrance,
      transform: `translateY(${interpolate(entrance, [0, 1], [40, 0])}px) scale(${isActive ? pulse : 1})`,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isLight 
        ? (isActive ? `0 10px 40px ${accent}22` : '0 10px 30px rgba(0,0,0,0.05)') 
        : (isActive ? `0 0 40px ${accent}44` : '0 20px 60px rgba(0,0,0,0.3)'),
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <div style={{
        position: 'absolute',
        top: 20,
        right: 24,
        background: isActive ? (isLight ? '#22c55e15' : 'rgba(34,197,94,0.2)') : (isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)'),
        border: `1px solid ${isActive ? '#22c55e' : themeColors.border}`,
        borderRadius: 100,
        padding: '6px 16px',
        fontSize: 12,
        fontWeight: 800,
        color: isActive ? '#22c55e' : themeColors.muted,
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />}
        {isActive ? 'ACTIVE' : 'READY'}
      </div>

      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: themeColors.bgIcon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        color: accent,
      }}>
        {icon}
      </div>

      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: themeColors.text, marginBottom: 8 }}>{name}</div>
        <div style={{ fontSize: 16, color: themeColors.muted, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
};

export const ExecutiveTeamScene = ({ theme = 'dark', title = "Your AI Executive Team" }: {
  theme?: 'light' | 'dark';
  title?: string;
}) => {
  const frame = useCurrentFrame();
  const isLight = theme === 'light';

  const agents = [
    { name: "AI CTO", icon: "👨‍💻", accent: "#22C55E", desc: "Technical architecture and build strategy.", delay: 0 },
    { name: "AI CEO", icon: "📈", accent: "#2d81e0", desc: "Vision, fundraising, and strategy.", delay: 15 },
    { name: "AI CMO", icon: "📣", accent: "#F97316", desc: "Growth, marketing, and distribution.", delay: 25 },
    { name: "Market Agent", icon: "🔍", accent: "#818CF8", desc: "Deep market scanning and feedback.", delay: 35 },
  ];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: isLight ? colors.lightBgProduct : colors.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 100px',
      fontFamily: fonts.base
    }}>
      {title && (
        <h2 style={{
          fontSize: 80,
          fontWeight: 900,
          color: isLight ? colors.lightText : colors.white,
          letterSpacing: '-2px',
          marginBottom: 60,
          textAlign: 'center'
        }}>
          {title}
        </h2>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 30,
        width: '100%',
        maxWidth: 1200
      }}>
        {agents.map((agent, i) => (
          <AgentCard 
            key={i}
            {...agent}
            theme={theme}
            isActive={true}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
