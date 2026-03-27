import { AbsoluteFill } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_WORD } from '../constants/motion';

export const Scene12_Transition3: React.FC = () => {
  const { line1, line2, line3, productCaption } = COPY.c12;

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      <SceneAudio filename="v4_s12_t3" />
      
      <div style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(147,51,234,0.1), transparent 70%)', bottom: '10%', right: '10%' }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '80%' }}>
            <WordReveal text={line1} startFrame={0} staggerFrames={STAGGER_WORD} fontSize={42} fontWeight={200} color="#94A3B8" />
            <WordReveal text={line2} startFrame={40} staggerFrames={STAGGER_WORD} fontSize={42} fontWeight={200} color="#94A3B8" />
            <div style={{ marginTop: 20 }}>
               <WordReveal text={line3} startFrame={90} staggerFrames={STAGGER_WORD} fontSize={72} fontWeight={900} color="#FFFFFF" />
            </div>
      </div>
      <ProductCaption text={productCaption} startFrame={140} />
    </AbsoluteFill>
  );
};
