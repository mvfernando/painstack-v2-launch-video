import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene10_Transition2: React.FC = () => {
  const { line1, line2, productCaption } = COPY.c10;
  const frame = useCurrentFrame();
  const blobX = 50 + Math.sin(frame / 40) * 15;
  const blobY = 50 + Math.cos(frame / 35) * -15;
  const blob2X = 50 + Math.cos(frame / 45) * -20;
  const blob2Y = 50 + Math.sin(frame / 50) * 20;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.6} />
      <SceneAudio filename="v4_s10_t2" />
      
      <div style={{
          position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%',
          background: `
            radial-gradient(circle at ${blobX}% ${blobY}%, rgba(59,130,246,0.35) 0%, transparent 40%),
            radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(236,117,36,0.25) 0%, transparent 40%)
          `,
          filter: 'blur(80px)',
          opacity: 0.9
      }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 250px rgba(0,0,0,0.9)', pointerEvents: 'none', zIndex: 5 }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 4,
        width: `${interpolate(frame, [0, 60], [0, 100], { extrapolateRight: 'clamp' })}%`,
        background: 'linear-gradient(90deg, #3B82F6, #ec7524)',
        boxShadow: '0 0 20px rgba(59,130,246,0.8)', zIndex: 50
      }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%', zIndex: 10 }}>
            <WordReveal text={line1} startFrame={20} staggerFrames={STAGGER_SLOW} fontSize={56} fontWeight={600} color="#FFFFFF" mode="pop" />
            <WordReveal text={line2} startFrame={90} staggerFrames={STAGGER_SLOW} fontSize={56} fontWeight={600} color="#FFFFFF" mode="pop" />
      </div>
      <ProductCaption text={productCaption} startFrame={40} />
    </AbsoluteFill>
  );
};
