import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const MetricRow = ({ label, val, color, delay }: { label: string; val: string; color: string; delay: number }) => {
  const frame = useCurrentFrame();
  
  const entrance = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "14px 18px", 
      background: colors.bgCard, 
      borderRadius: 12, 
      border: `1px solid ${colors.border}`,
      opacity: entrance,
      transform: `translateX(${x}px)`
    }}>
      <div style={{ fontSize: 14, color: colors.muted, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color }}>{val}</div>
    </div>
  );
};

export const BlueprintScoreScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  const labelEntrance = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringEntrance = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringScale = interpolate(ringEntrance, [0, 1], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ringProgress = interpolate(frame, [20, 90], [0, 0.87], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1)
  });
  
  const offset = circumference * (1 - ringProgress);
  const scoreVal = Math.floor(interpolate(frame, [20, 90], [0, 87], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const showCalculating = frame < 20;

  const badgeEntrance = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 160 } });

  // Success Glint (Visual highlight at 87%)
  const glintOpacity = interpolate(frame, [90, 95, 110], [0, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glintScale = interpolate(frame, [90, 110], [0.8, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const btnEntrance = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnY = interpolate(btnEntrance, [0, 1], [10, 0]);

  const metrics = [
    { label: "Problem Signal", val: "STRONG", color: colors.green, delay: 60 },
    { label: "Market Size", val: "$2.4B TAM", color: colors.blue, delay: 75 },
    { label: "Competition", val: "FRAGMENTED", color: colors.orange, delay: 90 },
    { label: "Time to MVP", val: "6–10 weeks", color: colors.white, delay: 105 },
  ];

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
        fontFamily: fonts.base,
        display: "flex", 
        gap: 60, 
        alignItems: "center",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Success Glint Overlay */}
        <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 150px 225px, ${colors.green}44 0%, transparent 70%)`,
            opacity: glintOpacity,
            transform: `scale(${glintScale})`,
            pointerEvents: 'none'
        }} />

        {/* Ring Section */}
        <div style={{ textAlign: "center", flexShrink: 0, width: 300, zIndex: 1 }}>
          <div style={{ 
            fontSize: 11, 
            fontWeight: 700, 
            color: colors.muted, 
            textTransform: "uppercase", 
            letterSpacing: "0.15em", 
            marginBottom: 24,
            opacity: labelEntrance
          }}>Blueprint Score</div>
          
          <div style={{ 
            position: "relative", 
            width: 220, 
            height: 220, 
            margin: "0 auto",
            opacity: ringEntrance,
            transform: `scale(${ringScale})`
          }}>
            <svg width={220} height={220} viewBox="0 0 220 220">
              <circle cx={110} cy={110} r={radius} fill="none" stroke={colors.bgCard} strokeWidth={14} />
              <circle 
                cx={110} cy={110} r={radius} 
                fill="none" 
                stroke={colors.green} 
                strokeWidth={14} 
                strokeLinecap="round"
                strokeDasharray={circumference} 
                strokeDashoffset={offset} 
                transform="rotate(-90 110 110)"
                style={{ filter: `drop-shadow(0 0 ${interpolate(frame, [90, 110], [12, 24], { extrapolateRight: 'clamp' })}px rgba(34,197,94,0.6))` }}
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
                <div style={{ fontSize: 16, color: colors.muted, fontWeight: 600 }}>Calculating...</div>
              ) : (
                <>
                  <div style={{ fontSize: 72, fontWeight: 900, color: colors.white, letterSpacing: "-2px", lineHeight: 1 }}>
                    {scoreVal}
                  </div>
                  <div style={{ fontSize: 16, color: colors.muted, fontWeight: 500 }}>/100</div>
                </>
              )}
            </div>
          </div>

          <div style={{ 
            background: "rgba(34,197,94,0.15)", 
            border: `2px solid ${colors.green}`, 
            borderRadius: 12, 
            padding: "12px 40px", 
            fontSize: 28, 
            fontWeight: 900, 
            color: colors.green, 
            marginTop: 32, 
            letterSpacing: "0.12em", 
            display: "inline-block",
            opacity: badgeEntrance,
            transform: `scale(${badgeEntrance})`,
            boxShadow: `0 10px 30px ${colors.green}33`
          }}>
            BUILD ✓
          </div>
        </div>

        {/* Metrics Section */}
        <div style={{ flex: 1, zIndex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: colors.white, marginBottom: 28, letterSpacing: '-1px' }}>Startup Blueprint</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
            {metrics.map((m, i) => (
              <MetricRow key={i} {...m} />
            ))}
          </div>
          <div style={{ 
            background: `linear-gradient(135deg, ${colors.blue}, #1d4ed8)`,
            borderRadius: 12, 
            padding: "16px", 
            textAlign: "center", 
            fontSize: 18, 
            fontWeight: 800, 
            color: colors.white,
            opacity: btnEntrance,
            transform: `translateY(${btnY}px)`,
            boxShadow: `0 10px 25px ${colors.blue}44`
          }}>
            View Full Blueprint →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
