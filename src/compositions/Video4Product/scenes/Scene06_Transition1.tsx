import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile, Sequence } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene06_Transition1: React.FC = () => {
  const { line1, line2, productCaption } = COPY.c06;
  const frame = useCurrentFrame();
  const blobX = 50 + Math.sin(frame / 40) * 20;
  const blobY = 50 + Math.cos(frame / 35) * 20;
  const blob2X = 50 + Math.cos(frame / 45) * 15;
  const blob2Y = 50 + Math.sin(frame / 50) * 15;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.6} />
      <SceneAudio filename="v4_s6_t1" />
      
      <div style={{
          position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%',
          background: `
            radial-gradient(circle at ${blobX}% ${blobY}%, rgba(249,115,22,0.35) 0%, transparent 40%),
            radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(59,130,246,0.25) 0%, transparent 40%)
          `,
          filter: 'blur(80px)',
          opacity: 0.9
      }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 250px rgba(0,0,0,0.9)', pointerEvents: 'none', zIndex: 5 }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 4,
        width: `${interpolate(frame, [0, 60], [0, 100], { extrapolateRight: 'clamp' })}%`,
        background: 'linear-gradient(90deg, #F97316, #3B82F6)',
        boxShadow: '0 0 20px rgba(59,130,246,0.8)', zIndex: 50
      }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%', zIndex: 10 }}>
            <WordReveal 
              text={line1} 
              startFrame={10} 
              staggerFrames={2} 
              fontSize={56} 
              fontWeight={600} 
              color="#FFFFFF" 
              highlights={{ "build.": "#11cc00d0", "build": "#11cc00d0" }}
              mode="pop" 
            />
            <WordReveal text={line2} startFrame={60} staggerFrames={2} fontSize={56} fontWeight={600} color="#FFFFFF" mode="pop" />
      </div>
      <Sequence from={110}>
        <SceneAudio filename="v4_s6_t1_p" />
        <ProductCaption text={productCaption} startFrame={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
