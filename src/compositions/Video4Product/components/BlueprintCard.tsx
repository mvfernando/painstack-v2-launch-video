import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface BlueprintCardProps {
  label: string;
  score: number;
  verdict: string;
  bullets: string[];
  startFrame?: number;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  label,
  score,
  verdict,
  bullets,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 12, mass: 1 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.75, 1.0]);
  const cardOpacity = interpolate(cardSpring, [0, 0.15], [0, 1]);

  // Score count-up: F12→F84
  const scoreProgress = interpolate(
    frame,
    [startFrame + 12, startFrame + 84],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const displayScore = Math.round(score * scoreProgress);

  // Progress bar synced to score
  const barWidth = scoreProgress * 100;

  // BUILD verdict entrance at F90
  const buildSpring = spring({
    frame: frame - (startFrame + 90),
    fps,
    config: { stiffness: 120, damping: 8, mass: 0.8 },
  });
  const buildScale = interpolate(buildSpring, [0, 1], [0, 1.0]);
  const buildOpacity = interpolate(frame, [startFrame + 88, startFrame + 95], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // BUILD glow pulse
  const buildGlowOpacity = interpolate(
    frame,
    [startFrame + 90, startFrame + 105, startFrame + 120],
    [0, 0.4, 0.2],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div style={{
      transform: `scale(${cardScale})`,
      opacity: cardOpacity,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: '36px 44px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      border: `1px solid ${colors.borderLight}`,
      width: 580,
      fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {/* Label */}
      <div style={{
        fontSize: 11, fontWeight: 600,
        color: colors.textDarkMuted,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>

      {/* Score + Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{
          fontSize: 64, fontWeight: 800,
          background: colors.gradScore,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}>
          {displayScore}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{
            height: 8, borderRadius: 4,
            backgroundColor: colors.bgLightSurface,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${barWidth}%`,
              borderRadius: 4,
              background: colors.gradScore,
              transition: 'width 0.1s ease',
            }} />
          </div>
          <div style={{ fontSize: 12, color: colors.textDarkMuted }}>
            validation score
          </div>
        </div>
      </div>

      {/* BUILD Verdict */}
      <div style={{
        opacity: buildOpacity,
        transform: `scale(${buildScale})`,
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'relative',
      }}>
        {/* Glow behind */}
        <div style={{
          position: 'absolute',
          width: 120, height: 50,
          borderRadius: 12,
          background: colors.greenBuildGlow,
          filter: 'blur(20px)',
          opacity: buildGlowOpacity,
          left: -10, top: -10,
        }} />
        <div style={{
          fontSize: 28, fontWeight: 800,
          color: colors.greenBuild,
          letterSpacing: '0.15em',
          position: 'relative',
        }}>
          {verdict}
        </div>
      </div>

      {/* Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
        {bullets.map((bullet, i) => {
          const bulletStart = startFrame + 110 + i * 14;
          const bOpacity = interpolate(frame, [bulletStart, bulletStart + 10], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const bTranslateX = interpolate(frame, [bulletStart, bulletStart + 16], [-18, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <div key={i} style={{
              opacity: bOpacity,
              transform: `translateX(${bTranslateX}px)`,
              fontSize: 13, color: colors.textDark,
              lineHeight: 1.5, fontWeight: 400,
              paddingLeft: 12,
              borderLeft: `2px solid ${colors.borderLight}`,
            }}>
              {bullet}
            </div>
          );
        })}
      </div>
    </div>
  );
};
