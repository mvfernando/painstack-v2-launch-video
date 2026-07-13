
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const RedditCard = ({ post, cardDelay }: { post: any; cardDelay: [number, number] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Card entrance: translateY 25px→0 + opacity 0→1 with spring
  const entrance = spring({ 
    frame: frame - cardDelay[0], 
    fps, 
    config: { damping: 14, stiffness: 100 } 
  });
  
  const y = interpolate(entrance, [0, 1], [25, 0]);

  // Inside each card, the elements entram sequencialmente:
  // - Subreddit + upvotes + badge: com o card (entrance)
  // - Texto da quote: 5 frames depois do card
  const quoteEntrance = spring({ frame: frame - cardDelay[0] - 5, fps, config: { damping: 15 } });
  
  // - Tags (#validation etc): 10 frames depois do card
  const tagsEntrance = spring({ frame: frame - cardDelay[0] - 10, fps, config: { damping: 15 } });

  // Border pulse for HIGH pain: opacity alterna entre 0.25 e 0.6 a cada 20 frames
  const pulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [0.25, 0.6]
  );
  
  const borderColor = post.pain === "HIGH" 
    ? `rgba(249,100,38,${pulse})` 
    : colors.border;

  return (
    <div style={{ 
      background: colors.bgCard, 
      border: `1px solid ${borderColor}`, 
      borderRadius: 14, 
      padding: "16px 18px",
      opacity: entrance,
      transform: `translateY(${y}px)`,
      boxShadow: post.pain === "HIGH" ? "0 10px 30px rgba(249,100,38,0.1)" : "none",
      height: "100%",
      boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: colors.orange }}>{post.sub}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 11, color: colors.muted }}>▲ {post.upvotes}</div>
          <div style={{ 
            fontSize: 10, 
            fontWeight: 800, 
            color: post.pain === "HIGH" ? colors.orange : colors.muted, 
            border: `1px solid ${post.pain === "HIGH" ? colors.orange : colors.border}`, 
            borderRadius: 4, 
            padding: "2px 6px" 
          }}>{post.pain}</div>
        </div>
      </div>
      
      <div style={{ 
        fontSize: 15, 
        color: colors.white, 
        lineHeight: 1.5, 
        marginBottom: 12, 
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
            fontSize: 11, 
            color: colors.muted, 
            background: "rgba(45,129,224,0.08)", 
            border: `1px solid rgba(45,129,224,0.15)`, 
            borderRadius: 4, 
            padding: "2px 8px" 
          }}>#{tag}</div>
        ))}
      </div>
    </div>
  );
};

export const EvidenceCardsScene = () => {
  const frame = useCurrentFrame();

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
      padding: 40
    }}>
      <div style={{ 
        background: colors.bg, 
        borderRadius: 20, 
        padding: "32px", 
        width: "100%", 
        height: "100%",
        boxSizing: "border-box",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        fontFamily: fonts.base
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: 32,
          opacity: headerEntrance,
          transform: `translateY(${headerY}px)`
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: colors.orange, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Evidence Hub</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: colors.white, letterSpacing: "-0.5px" }}>Real pain. Real people. Real data.</div>
          </div>
          <div style={{ 
            fontSize: 14, 
            color: colors.muted, 
            background: colors.bgCard, 
            border: `1px solid ${colors.border}`, 
            borderRadius: 100, 
            padding: "8px 20px",
            opacity: pillEntrance,
            transform: `translateX(${pillX}px)`
          }}>
            <span style={{ color: colors.blue, fontWeight: 700 }}>847</span> evidence points
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {posts.map((post, i) => (
            <RedditCard key={i} post={post} cardDelay={cardDelays[i]} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
