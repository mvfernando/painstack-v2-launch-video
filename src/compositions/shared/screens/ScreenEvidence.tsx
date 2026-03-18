
import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  Easing 
} from 'remotion';
import { colors, fonts } from '../../../shared/brand';

const RedditCard: React.FC<{ 
  subreddit: string; 
  pain: 'HIGH' | 'MEDIUM'; 
  text: string; 
  upvotes: string;
  delay: number;
}> = ({ subreddit, pain, text, upvotes, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 }
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [20, 0]);

  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      opacity,
      transform: `translateY(${translateY}px)`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: colors.orange, fontSize: 11, fontWeight: 600, fontFamily: fonts.base }}>{subreddit}</div>
        <div style={{ 
          border: `1px solid ${pain === 'HIGH' ? colors.orange : colors.border}`, 
          color: pain === 'HIGH' ? colors.orange : '#94A3B8', 
          fontSize: 10, 
          padding: '2px 6px', 
          borderRadius: 4,
          fontWeight: 700
        }}>
          {pain} PAIN
        </div>
      </div>
      <div style={{ fontSize: 13, color: colors.white, lineHeight: 1.5, fontFamily: fonts.base }}>
        "{text}"
      </div>
      <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: fonts.base }}>
        ▲ {upvotes}
      </div>
    </div>
  );
};

export const ScreenEvidence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Entrance (0-25)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 130 }
  });
  const entranceScale = interpolate(entrance, [0, 1], [0.88, 1.0]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Phase 3: Pan + zoom on card 1 (80-140)
  const zoomProgress = interpolate(frame, [80, 140], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const zoomScale = interpolate(zoomProgress, [0, 1], [1.0, 1.4]);
  // transformOrigin: "30% 40%"

  // Phase 4: Fade out (140-180)
  const fadeOutOpacity = interpolate(frame, [140, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const finalZoomScale = interpolate(frame, [140, 180], [1.4, 1.5], {
    extrapolateLeft: 'clamp'
  });

  const currentScale = frame < 140 ? zoomScale : finalZoomScale;
  const currentOpacity = frame < 140 ? entranceOpacity : fadeOutOpacity;

  const cards = [
    { subreddit: 'r/startups', pain: 'HIGH' as const, text: 'Spent $40k building. Got 3 users. Should have validated first.', upvotes: '2.4k', delay: 25 },
    { subreddit: 'r/entrepreneur', pain: 'HIGH' as const, text: 'How do you validate without spending money? I keep building things nobody uses.', upvotes: '1.2k', delay: 40 },
    { subreddit: 'r/indiehackers', pain: 'HIGH' as const, text: 'Launched after 6 months. Zero signups. Back to square one.', upvotes: '634', delay: 55 },
    { subreddit: 'r/SaaS', pain: 'MEDIUM' as const, text: "Our churn is 60%. Realized we're solving a problem that isn't that painful.", upvotes: '847', delay: 70 },
  ];

  return (
    <AbsoluteFill style={{ background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 1400,
        height: 900,
        background: colors.bg,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        opacity: currentOpacity,
        transform: `scale(${entranceScale * (currentScale / entranceScale)})`,
        transformOrigin: '30% 40%'
      }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ 
            fontSize: 11, 
            color: colors.orange, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            fontWeight: 600, 
            fontFamily: fonts.base,
            marginBottom: 8
          }}>
            EVIDENCE HUB
          </div>
          <h1 style={{ 
            color: colors.white, 
            fontSize: 32, 
            fontWeight: 800, 
            letterSpacing: '-1px', 
            fontFamily: fonts.base,
            margin: 0
          }}>
            Real pain. Real people. Real data.
          </h1>
        </div>

        {/* Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 14, 
          flex: 1 
        }}>
          {cards.map((card, i) => (
            <RedditCard key={i} {...card} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 40, 
          fontSize: 12, 
          color: '#94A3B8', 
          fontFamily: fonts.base 
        }}>
          Sources: Reddit · HN · Product Hunt · <span style={{ color: colors.blue }}>847 evidence points collected</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
