import { AbsoluteFill, interpolate, useCurrentFrame, Sequence } from 'remotion';
import React from 'react';
import { WordReveal } from '../components/WordReveal';
import { UserCaption } from '../components/UserCaption';
import { ProductCaption } from '../components/ProductCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { STAGGER_SLOW } from '../constants/motion';

export const Scene16_HookFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { line1, line2, line3, punchline, userCaption, productCaption } = COPY.c16;

  const glowOpacity = interpolate(frame, [200, 240, 300], [0.2, 0.5, 0.3], { extrapolateLeft: 'clamp' });
  const lineStarts = [0, 80, 160];

  return (
    <AbsoluteFill style={{ backgroundColor: '#060609' }}>
      <SceneAudio filename="v4_s16_hook_s" />
      
      {/* Background glow - darkened slightly for contrast */}
      <div style={{ position: 'absolute', width: 1000, height: 1000, borderRadius: '50%', background: `radial-gradient(circle, rgba(249,115,22,${glowOpacity}), transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(150px)', opacity: 0.8 }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '80%', zIndex: 10 }}>
        {[line1, line2, line3].map((line, i) => (
          <div key={i} style={{ opacity: interpolate(frame, [lineStarts[i+1] || 240, (lineStarts[i+1] || 240) + 20], [1, 0.3], { extrapolateLeft: 'clamp' }) }}>
            <WordReveal text={line} startFrame={lineStarts[i]} staggerFrames={STAGGER_SLOW} fontSize={i === 2 ? 46 : 38} fontWeight={i === 2 ? 700 : 300} color="#FFFFFF" />
          </div>
        ))}
        <div style={{ marginTop: 40, filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))' }}>
          <WordReveal text={punchline.text} startFrame={240} staggerFrames={STAGGER_SLOW} fontSize={68} fontWeight={800} gradient={punchline.gradient} />
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={40} exitFrame={220} />
      <Sequence from={240}>
        <SceneAudio filename="v4_s16_hook_p" />
      </Sequence>
      <ProductCaption text={productCaption} startFrame={240} />
    </AbsoluteFill>
  );
};
