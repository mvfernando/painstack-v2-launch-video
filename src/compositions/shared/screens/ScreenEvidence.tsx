
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate, 
  spring, 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const RedditCard = ({ post, cardDelay, isVertical }: { post: any; cardDelay: [number, number]; isVertical: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Card entrance: translateY 25px→0 + opacity 0→1 with spring
  const entrance = spring({ 
    frame: frame - cardDelay[0], 
    fps, 
    config: { damping: 14, stiffness: 100 } 
  });
  
  const y = interpolate(entrance, [0, 1], [25, 0]);

  // Inside each card, the elements enter sequentially:
  const quoteEntrance = spring({ frame: frame - cardDelay[0] - 5, fps, config: { damping: 15 } });
  const tagsEntrance = spring({ frame: frame - cardDelay[0] - 10, fps, config: { damping: 15 } });

  // Border pulse for HIGH pain
  const pulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [0.25, 0.6]
  );
  
  const borderColor = post.pain === "HIGH" 
    ? `rgba(249,100,38,${pulse})` 
    : 'rgba(255,255,255,0.08)';

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(12px)', 
      border: `1px solid ${borderColor}`,
      borderTop: `1px solid ${post.pain === "HIGH" ? borderColor : 'rgba(255,255,255,0.12)'}`, 
      borderRadius: isVertical ? 18 : 14, 
      padding: isVertical ? "20px 22px" : "16px 18px",
      opacity: entrance,
      transform: `translateY(${y}px)`,
      boxShadow: post.pain === "HIGH" ? `0 0 25px rgba(249,100,38,${interpolate(pulse, [0.25, 0.6], [0.1, 0.3])})` : "0 10px 30px rgba(0,0,0,0.2)",
      height: "100%",
      boxSizing: "border-box" as const
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isVertical ? 14 : 10 }}>
        <div style={{ fontSize: isVertical ? 20 : 13, fontWeight: 700, color: colors.orange }}>{post.sub}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: isVertical ? 16 : 11, color: colors.muted }}>▲ {post.upvotes}</div>
          <div style={{ 
            fontSize: isVertical ? 14 : 10, 
            fontWeight: 800, 
            color: post.pain === "HIGH" ? colors.orange : colors.muted, 
            border: `1px solid ${post.pain === "HIGH" ? colors.orange : colors.border}`, 
            borderRadius: 4, 
            padding: isVertical ? "4px 8px" : "2px 6px" 
          }}>{post.pain}</div>
        </div>
      </div>
      
      <div style={{ 
        fontSize: isVertical ? 24 : 15, 
        color: colors.white, 
        lineHeight: 1.5, 
        marginBottom: isVertical ? 16 : 12, 
        fontWeight: 400,
        opacity: quoteEntrance,
        transform: `translateY(${interpolate(quoteEntrance, [0, 1], [5, 0])}px)`
      }}>
        "{post.text}"
      </div>
      
      <div style={{ 
        display: "flex", 
        gap: 6,
        opacity: tagsEntrance,
        transform: `translateY(${interpolate(tagsEntrance, [0, 1], [5, 0])}px)`
      }}>
        {post.tags.map((tag: string, j: number) => (
          <div key={j} style={{ 
            fontSize: isVertical ? 14 : 11, 
            color: colors.muted, 
            background: "rgba(45,129,224,0.08)", 
            border: `1px solid rgba(45,129,224,0.15)`, 
            borderRadius: 4, 
            padding: isVertical ? "4px 10px" : "2px 8px" 
          }}>#{tag}</div>
        ))}
      </div>
    </div>
  );
};

export const EvidenceCardsScene = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  const posts = [
    { sub: "r/startups", upvotes: "2.4k", pain: "HIGH", text: "Spent $40k and 8 months building. Got 3 users. I should have validated first.", tags: ["validation", "failure"] },
    { sub: "r/entrepreneur", upvotes: "1.2k", pain: "HIGH", text: "How do you validate without spending money? I keep building things nobody uses.", tags: ["validation", "mvp"] },
    { sub: "r/SaaS", upvotes: "847", pain: "MEDIUM", text: "Our churn is 60%. Just realized we're solving a problem that isn't that painful.", tags: ["churn", "pmf"] },
    { sub: "r/indiehackers", upvotes: "634", pain: "HIGH", text: "Launched after 6 months of work. Zero signups. Back to square one.", tags: ["launch", "failure"] },
  ];

  // 1. Frame 0–20: header fade + slide-up
  const headerEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerY = interpolate(headerEntrance, [0, 1], [15, 0]);

  // 2. Frame 15–30: pill entra da direita (translateX 20px→0)
  const pillEntrance = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pillX = interpolate(pillEntrance, [0, 1], [20, 0]);

  // 3. Cards stagger: Card 1 (25-45), Card 2 (40-60), Card 3 (55-75), Card 4 (70-90)
  const cardDelays: [number, number][] = [[25, 45], [40, 60], [55, 75], [70, 90]];

  return (
    <AbsoluteFill style={{ 
      background: colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: isVertical ? 30 : 40
    }}>
      <div style={{ 
        background: colors.bg, 
        borderRadius: isVertical ? 24 : 20, 
        padding: isVertical ? "28px" : "32px", 
        width: "100%", 
        height: "100%",
        boxSizing: "border-box" as const,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        fontFamily: fonts.base,
        overflow: 'hidden',
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: isVertical ? "column" : "row",
          justifyContent: "space-between", 
          alignItems: isVertical ? "flex-start" : "center", 
          marginBottom: isVertical ? 24 : 32,
          gap: isVertical ? 12 : 0,
          opacity: headerEntrance,
          transform: `translateY(${headerY}px)`
        }}>
          <div>
            <div style={{ fontSize: isVertical ? 16 : 11, fontWeight: 700, color: colors.orange, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Evidence Hub</div>
            <div style={{ fontSize: isVertical ? 32 : 26, fontWeight: 800, color: colors.white, letterSpacing: "-0.5px" }}>Real pain. Real people. Real data.</div>
          </div>
          <div style={{ 
            fontSize: isVertical ? 16 : 14, 
            color: colors.muted, 
            background: colors.bgCard, 
            border: `1px solid ${colors.border}`, 
            borderRadius: 100, 
            padding: isVertical ? "10px 22px" : "8px 20px",
            opacity: pillEntrance,
            transform: `translateX(${pillX}px)`
          }}>
            <span style={{ color: colors.blue, fontWeight: 700 }}>847</span> evidence points
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isVertical ? "1fr" : "1fr 1fr", gap: isVertical ? 12 : 16 }}>
          {posts.map((post, i) => (
            <RedditCard key={i} post={post} cardDelay={cardDelays[i]} isVertical={isVertical} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
