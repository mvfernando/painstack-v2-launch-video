
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const DocRow = ({ doc, delay }: { doc: any; delay: number }) => {
  const frame = useCurrentFrame();
  
  
  // 2. Cada linha de documento entra em stagger: translateY 15px→0 + opacity 0→1
  const entrance = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(entrance, [0, 1], [15, 0]);

  // 3. Os badges "AI Generated" (a azul) têm um brilho subtil: opacity pulsa entre 0.8 e 1.0 a cada 20 frames
  const pulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [0.8, 1.0]
  );
  
  const isAiBadge = doc.badge === "AI Generated";

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 16, 
      padding: "16px 20px", 
      background: colors.bgCard, 
      borderRadius: 12, 
      border: `1px solid ${colors.border}`,
      opacity: entrance,
      transform: `translateY(${y}px)`
    }}>
      <div style={{ fontSize: 24, flexShrink: 0 }}>{doc.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: colors.white }}>{doc.title}</div>
        <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>{doc.type} · {doc.size} · {doc.date}</div>
      </div>
      {doc.badge && (
        <div style={{ 
          fontSize: 11, 
          fontWeight: 700, 
          color: doc.badgeColor, 
          border: `1px solid ${doc.badgeColor}44`, 
          borderRadius: 100, 
          padding: "4px 12px",
          opacity: isAiBadge ? pulse : 1
        }}>
          {doc.badge}
        </div>
      )}
      <div style={{ fontSize: 18, color: colors.muted, marginLeft: 10 }}>↗</div>
    </div>
  );
};

export const DataRoomScene = () => {
  const frame = useCurrentFrame();

  const docs = [
    { icon: "📊", title: "Market Analysis Report", type: "PDF", size: "2.4 MB", date: "Today", badge: "AI Generated", badgeColor: colors.blue, delay: 20 },
    { icon: "🎯", title: "Problem Validation", type: "DOC", size: "840 KB", date: "Today", badge: "AI Generated", badgeColor: colors.blue, delay: 32 },
    { icon: "📈", title: "GTM Strategy", type: "DOC", size: "1.1 MB", date: "Yesterday", badge: "Draft", badgeColor: colors.orange, delay: 44 },
    { icon: "💰", title: "Financial Projections", type: "XLS", size: "560 KB", date: "2 days ago", badge: "Template", badgeColor: colors.muted, delay: 56 },
    { icon: "🏗️", title: "Technical Architecture", type: "PDF", size: "3.2 MB", date: "3 days ago", badge: null, badgeColor: null, delay: 68 },
    { icon: "📋", title: "Pitch Deck v2", type: "PPT", size: "8.7 MB", date: "1 week ago", badge: "Ready", badgeColor: colors.green, delay: 80 },
  ];

  // 1. Frame 0–20: header + botão entra (header da esquerda, botão da direita)
  const headerEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerX = interpolate(headerEntrance, [0, 1], [-20, 0]);
  const btnX = interpolate(headerEntrance, [0, 1], [20, 0]);

  // 4. Frame 110–150: fade out geral (opacity 1→0)
  const fadeOut = interpolate(frame, [110, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      background: colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 40,
      opacity: fadeOut
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
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: 32,
          opacity: headerEntrance
        }}>
          <div style={{ transform: `translateX(${headerX}px)` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Dataroom & Docs</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: colors.white, letterSpacing: "-0.5px" }}>Your startup documents</div>
          </div>
          <div style={{ 
            background: colors.blue, 
            color: colors.white, 
            fontSize: 14, 
            fontWeight: 700, 
            padding: "10px 24px", 
            borderRadius: 12,
            transform: `translateX(${btnX}px)`
          }}>+ New Document</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {docs.map((doc, i) => (
            <DocRow key={i} doc={doc} delay={doc.delay} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
