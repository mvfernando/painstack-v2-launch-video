
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate, 
  spring
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';
import { FileText, FileSearch, TrendingUp, DollarSign, Database, Presentation } from 'lucide-react';

const DocRow = ({ doc, delay, isVertical }: { doc: any; delay: number; isVertical: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Spring entrance for bouncing effect
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(entrance, [0, 1], [30, 0]);

  // Micro-animation for badges (subtle pulse)
  const badgePulse = interpolate(
    Math.sin((frame - delay) / 15),
    [-1, 1],
    [0.9, 1.1]
  );

  // Micro-animation for icons (subtle float)
  const iconFloat = interpolate(
    Math.sin((frame - delay) / 20),
    [-1, 1],
    [-1, 1]
  );
  
  const isAiBadge = doc.badge === "AI Generated";

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: isVertical ? 20 : 16, 
      padding: isVertical ? "20px 24px" : "16px 20px", 
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: isVertical ? 16 : 12, 
      border: `1px solid rgba(255, 255, 255, 0.08)`,
      borderTop: `1px solid rgba(255, 255, 255, 0.15)`,
      opacity: opacity,
      transform: `translateY(${y}px)`,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        color: doc.badgeColor || colors.muted, 
        flexShrink: 0, 
        transform: `translateY(${iconFloat}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isVertical ? 32 : 28,
        height: isVertical ? 32 : 28
      }}>
        {doc.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: isVertical ? 24 : 16, fontWeight: 700, color: colors.white }}>{doc.title}</div>
        <div style={{ fontSize: isVertical ? 16 : 12, color: colors.muted, marginTop: 4 }}>{doc.type} · {doc.size} · {doc.date}</div>
      </div>
      {doc.badge && (
        <div style={{ 
          fontSize: isVertical ? 14 : 11, 
          fontWeight: 700, 
          color: doc.badgeColor, 
          border: `1px solid ${doc.badgeColor}44`,
          background: `${doc.badgeColor}15`, 
          borderRadius: 100, 
          padding: isVertical ? "6px 14px" : "4px 12px",
          transform: isAiBadge ? `scale(${badgePulse})` : 'none',
          boxShadow: isAiBadge ? `0 0 10px ${doc.badgeColor}33` : 'none'
        }}>
          {doc.badge}
        </div>
      )}
      <div style={{ fontSize: isVertical ? 24 : 18, color: colors.muted, marginLeft: 10 }}>↗</div>
    </div>
  );
};

export const DataRoomScene = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;
  
  const iconSize = isVertical ? 32 : 28;

  const docs = [
    { icon: <FileText size={iconSize} />, title: "Market Analysis Report", type: "PDF", size: "2.4 MB", date: "Today", badge: "AI Generated", badgeColor: colors.blue, delay: 20 },
    { icon: <FileSearch size={iconSize} />, title: "Problem Validation", type: "DOC", size: "840 KB", date: "Today", badge: "AI Generated", badgeColor: colors.blue, delay: 32 },
    { icon: <TrendingUp size={iconSize} />, title: "GTM Strategy", type: "DOC", size: "1.1 MB", date: "Yesterday", badge: "Draft", badgeColor: colors.orange, delay: 44 },
    { icon: <DollarSign size={iconSize} />, title: "Financial Projections", type: "XLS", size: "560 KB", date: "2 days ago", badge: "Template", badgeColor: colors.muted, delay: 56 },
    { icon: <Database size={iconSize} />, title: "Technical Architecture", type: "PDF", size: "3.2 MB", date: "3 days ago", badge: null, badgeColor: null, delay: 68 },
    { icon: <Presentation size={iconSize} />, title: "Pitch Deck v2", type: "PPT", size: "8.7 MB", date: "1 week ago", badge: "Ready", badgeColor: colors.green, delay: 80 },
  ];

  const headerEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerX = interpolate(headerEntrance, [0, 1], [-20, 0]);
  const btnX = interpolate(headerEntrance, [0, 1], [20, 0]);

  const fadeOut = interpolate(frame, [110, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      background: colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: isVertical ? 30 : 40,
      opacity: fadeOut
    }}>
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))', 
        border: `1px solid ${colors.border}`, 
        borderTop: `1px solid rgba(255,255,255,0.1)`,
        borderRadius: isVertical ? 28 : 24, 
        padding: isVertical ? "36px 28px" : "48px", 
        width: "100%", 
        height: "100%",
        boxSizing: "border-box" as const,
        boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
        fontFamily: fonts.base,
        overflow: 'hidden',
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: isVertical ? "column" : "row",
          justifyContent: "space-between", 
          alignItems: isVertical ? "flex-start" : "center", 
          marginBottom: isVertical ? 24 : 32,
          gap: isVertical ? 16 : 0,
          opacity: headerEntrance
        }}>
          <div style={{ transform: `translateX(${headerX}px)` }}>
            <div style={{ fontSize: isVertical ? 16 : 11, fontWeight: 700, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Dataroom & Docs</div>
            <div style={{ fontSize: isVertical ? 32 : 26, fontWeight: 800, color: colors.white, letterSpacing: "-0.5px" }}>Your startup documents</div>
          </div>
          <div style={{ 
            background: colors.blue, 
            color: colors.white, 
            fontSize: isVertical ? 18 : 14, 
            fontWeight: 700, 
            padding: isVertical ? "12px 28px" : "10px 24px", 
            borderRadius: isVertical ? 16 : 12,
            transform: `translateX(${btnX}px)`,
            boxShadow: `0 10px 20px ${colors.blue}44`
          }}>+ New Document</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isVertical ? 12 : 10 }}>
          {docs.map((doc, i) => (
            <DocRow key={i} doc={doc} delay={doc.delay} isVertical={isVertical} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
