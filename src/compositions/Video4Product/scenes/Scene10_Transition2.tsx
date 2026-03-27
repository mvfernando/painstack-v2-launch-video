import { AbsoluteFill } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene10_Transition2: React.FC = () => {
  const { line1, line2, productCaption } = COPY.c10;

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      <SceneAudio filename="v4_s10_t2" />
      <div style={{ position: 'absolute', width: 800, height: 800, background: 'radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)', top: '10%', left: '10%' }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%' }}>
            <WordReveal text={line1} startFrame={0} staggerFrames={STAGGER_SLOW} fontSize={56} fontWeight={600} color="#FFFFFF" />
            <WordReveal text={line2} startFrame={60} staggerFrames={STAGGER_SLOW} fontSize={56} fontWeight={600} color="#FFFFFF" />
      </div>
      <ProductCaption text={productCaption} startFrame={130} />
    </AbsoluteFill>
  );
};
