import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors } from '../constants/colors';

interface BrandBackgroundProps {
  glowOpacity?: number;
}

export const BrandBackground: React.FC<BrandBackgroundProps> = ({
  glowOpacity = 0.35
}) => {
  const frame = useCurrentFrame();
  
  // Subtle drift
  const driftX = Math.sin(frame / 60) * 20;
  const driftY = Math.cos(frame / 75) * 15;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgDark }}>
      {/* Amber/Orange Primary Glow */}
      <div style={{
        position: 'absolute',
        width: 1000,
        height: 1000,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)',
        top: '40%',
        left: '60%',
        transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px)`,
        filter: 'blur(140px)',
        opacity: glowOpacity,
      }} />

      {/* Deep Blue Secondary Glow */}
      <div style={{
        position: 'absolute',
        width: 1200,
        height: 1200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(12,20,69,0.5), transparent 70%)',
        bottom: '10%',
        left: '-10%',
        transform: `translate(0, 0)`,
        filter: 'blur(160px)',
        opacity: 0.6,
      }} />
    </AbsoluteFill>
  );
};
