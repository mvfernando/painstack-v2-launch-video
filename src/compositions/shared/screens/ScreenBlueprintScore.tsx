
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';


const MetricRow = ({ 
  label, 
  val, 
  color, 
  delay, 
  theme = 'dark' 
}: { 
  label: string; 
  val: string; 
  color: string; 
  delay: number;
  theme?: 'light' | 'dark';
}) => {
  const frame = useCurrentFrame();
  const isLight = theme === 'light';
  
  const entrance = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "14px 18px", 
      background: isLight ? 'rgba(241, 245, 249, 0.4)' : "rgba(30, 41, 59, 0.4)", 
      backdropFilter: 'blur(10px)',
      borderRadius: 12, 
      border: `1px solid ${isLight ? 'rgba(226, 232, 240, 0.5)' : "rgba(45, 63, 94, 0.5)"}`,
      opacity: entrance,
      transform: `translateX(${x}px)`
    }}>
      <div style={{ fontSize: 14, color: isLight ? colors.lightMuted : colors.muted, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color }}>{val}</div>
    </div>
  );
};

export const BlueprintScoreScene = ({
  theme = 'dark',
  targetScore = 87,
  metrics: customMetrics,
  cardWidth = "100%"
}: {
  theme?: 'light' | 'dark';
  targetScore?: number;
  metrics?: Array<{ label: string; val: string; color: string; delay: number }>;
  cardWidth?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isLight = theme === 'light';
  const isVertical = height > width;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  const labelEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringEntrance = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringScale = interpolate(ringEntrance, [0, 1], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ringProgress = interpolate(frame, [20, 90], [0, targetScore / 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1)
  });
  
  const offset = circumference * (1 - ringProgress);
  const scoreVal = Math.floor(interpolate(frame, [20, 90], [0, targetScore], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const showCalculating = frame < 20;

  const badgeEntrance = spring({ 
    frame: frame - 90, 
    fps, 
    config: theme === 'light' ? { damping: 10, stiffness: 100 } : { damping: 14, stiffness: 160 } 
  });

  const bloom = interpolate(frame, [90, 95, 105], [0, 1, 0], { extrapolateRight: 'clamp' });

  const btnEntrance = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnY = interpolate(btnEntrance, [0, 1], [10, 0]);

  const finalMetrics = customMetrics || [
    { label: "Problem Signal", val: "STRONG", color: colors.green, delay: 60 },
    { label: "Market Size", val: "$2.4B TAM", color: colors.blue, delay: 75 },
    { label: "Competition", val: "FRAGMENTED", color: colors.orange, delay: 90 },
    { label: "Time to MVP", val: "6–10 weeks", color: isLight ? colors.lightText : colors.white, delay: 105 },
  ];

  return (
    <AbsoluteFill style={{ 
      background: isLight ? colors.lightBgProduct : colors.bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: isVertical ? 20 : 40
    }}>
      <div style={{ 
        background: isLight ? colors.lightBg : colors.bg, 
        border: `1px solid ${isLight ? colors.lightBorder : colors.border}`, 
        borderRadius: 24, 
        padding: isVertical ? "40px 24px" : "48px", 
        width: cardWidth, 
        height: cardWidth === "100%" ? "100%" : "auto",
        boxSizing: "border-box",
        boxShadow: isLight ? "0 20px 60px rgba(0,0,0,0.08)" : "0 40px 100px rgba(0,0,0,0.6)",
        fontFamily: fonts.base,
        display: "flex", 
        flexDirection: isVertical ? 'column' : 'row',
        gap: isVertical ? 40 : 60, 
        alignItems: "center",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Success Bloom Overlay */}
        <AbsoluteFill style={{
            background: `radial-gradient(circle at center, ${colors.green}22 0%, transparent 70%)`,
            opacity: bloom,
            pointerEvents: 'none',
            zIndex: 10
        }} />

        {/* Ring Section */}
        <div style={{ textAlign: "center", flexShrink: 0, width: isVertical ? '100%' : 300, zIndex: 1 }}>
          <div style={{ 
            fontSize: 11, 
            fontWeight: 700, 
            color: isLight ? colors.lightMuted : colors.muted, 
            textTransform: "uppercase", 
            letterSpacing: "0.15em", 
            marginBottom: isVertical ? 16 : 24,
            opacity: labelEntrance
          }}>Blueprint Score</div>
          
          <div style={{ 
            position: "relative", 
            width: isVertical ? 180 : 220, 
            height: isVertical ? 180 : 220, 
            margin: "0 auto",
            opacity: ringEntrance,
            transform: `scale(${ringScale})`
          }}>
            <svg width={isVertical ? 180 : 220} height={isVertical ? 180 : 220} viewBox={isVertical ? "0 0 180 180" : "0 0 220 220"}>
              <circle cx={isVertical ? 90 : 110} cy={isVertical ? 90 : 110} r={isVertical ? 75 : radius} fill="none" stroke={isLight ? '#f1f5f9' : colors.bgCard} strokeWidth={isVertical ? 12 : 14} />
              <circle 
                cx={isVertical ? 90 : 110} cy={isVertical ? 90 : 110} r={isVertical ? 75 : radius} 
                fill="none" 
                stroke={isLight ? colors.orange : colors.green} 
                strokeWidth={isVertical ? 12 : 14} 
                strokeLinecap="round"
                strokeDasharray={isVertical ? 2 * Math.PI * 75 : circumference} 
                strokeDashoffset={isVertical ? (2 * Math.PI * 75) * (1 - ringProgress) : offset} 
                transform={isVertical ? "rotate(-90 90 90)" : "rotate(-90 110 110)"}
                style={{ 
                    filter: isLight ? 'none' : `drop-shadow(0 0 12px rgba(34,197,94,0.4))`,
                    transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
            </svg>
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              {showCalculating ? (
                <div style={{ fontSize: 14, color: isLight ? colors.lightMuted : colors.muted, fontWeight: 600 }}>Calculating...</div>
              ) : (
                <>
                  <div style={{ 
                      fontSize: isVertical ? 56 : 72, 
                      fontWeight: 900, 
                      color: isLight ? colors.lightText : colors.white, 
                      letterSpacing: "-2px", 
                      lineHeight: 1,
                      transform: `scale(${1 + bloom * 0.1})`,
                      transition: 'transform 0.1s ease-out'
                  }}>
                    {scoreVal}
                  </div>
                  <div style={{ fontSize: 14, color: isLight ? colors.lightMuted : colors.muted, fontWeight: 500 }}>/100</div>
                </>
              )}
            </div>
          </div>

          <div style={{ 
            background: isLight ? `${colors.green}11` : "rgba(34,197,94,0.15)", 
            border: `2px solid ${colors.green}`, 
            borderRadius: 12, 
            padding: isVertical ? "8px 32px" : "12px 40px", 
            fontSize: isVertical ? 22 : 28, 
            fontWeight: 900, 
            color: colors.green, 
            marginTop: isVertical ? 20 : 32, 
            letterSpacing: "0.12em", 
            display: "inline-block",
            opacity: badgeEntrance,
            transform: `scale(${badgeEntrance})`,
            boxShadow: isLight ? "none" : `0 10px 40px ${colors.green}55`
          }}>
            BUILD ✓
          </div>
        </div>

        {/* Metrics Section */}
        <div style={{ flex: 1, zIndex: 1, width: isVertical ? '100%' : 'auto' }}>
          <div style={{ 
            fontSize: isVertical ? 20 : 24, 
            fontWeight: 900, 
            color: isLight ? colors.lightText : colors.white, 
            marginBottom: 20, 
            letterSpacing: '-1.2px',
            textAlign: isVertical ? 'center' : 'left'
          }}>Startup Blueprint</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: isVertical ? 30 : 40 }}>
            {finalMetrics.map((m, i) => (
              <MetricRow key={i} {...m} theme={theme} />
            ))}
          </div>
          <div style={{ 
            background: isLight ? colors.lightText : `linear-gradient(135deg, ${colors.blue}, #1d4ed8)`,
            borderRadius: 14, 
            padding: "16px", 
            textAlign: "center", 
            fontSize: 18, 
            fontWeight: 900, 
            color: colors.white,
            opacity: btnEntrance,
            transform: `translateY(${btnY}px)`,
            boxShadow: isLight ? "0 10px 30px rgba(0,0,0,0.1)" : `0 15px 35px ${colors.blue}66`,
          }}>
            Explore Full Blueprint →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
