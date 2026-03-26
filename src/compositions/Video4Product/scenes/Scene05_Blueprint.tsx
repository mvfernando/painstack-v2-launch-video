import { AbsoluteFill, Audio, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { BlueprintCard } from '../components/BlueprintCard';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { ProductConfirm } from '../components/ProductConfirm';
import { COPY } from '../constants/copy';

export const Scene05_Blueprint: React.FC = () => {
  const frame = useCurrentFrame();
  const { label, score, verdict, bullets, userThought, productConfirm } = COPY.c05;

  // Dark→light crossfade (first 15f)
  const darkOverlay = interpolate(frame, [0, 15], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      {/* Dark overlay fading out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#060609',
        opacity: darkOverlay,
        pointerEvents: 'none',
        zIndex: 10,
      }} />

      {/* Blueprint card centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '55%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}>
        <BlueprintCard
          label={label}
          score={score}
          verdict={verdict}
          bullets={bullets}
          startFrame={0}
        />
      </div>

      {/* Sarah's thought — left side */}
      <ThoughtCaption
        text={userThought.pre}
        startFrame={15}
        position="bottom-left"
        color="#94A3B8"
        fontSize={24}
        fontWeight={400}
      />

      {/* Second thought after BUILD */}
      <ThoughtCaption
        text={userThought.post}
        startFrame={100}
        position="bottom-left"
        color="#0F172A"
        fontSize={22}
        fontWeight={400}
      />

      {/* Product confirm */}
      <ProductConfirm text={productConfirm} startFrame={105} />

      {/* SFX on BUILD at F90 */}
      {frame >= 88 && (
        <Audio
          src={staticFile('audio/sfx_success_chime.mp3')}
          volume={0.45}
          startFrom={0}
        />
      )}
    </AbsoluteFill>
  );
};
