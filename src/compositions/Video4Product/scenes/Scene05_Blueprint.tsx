import { AbsoluteFill, Sequence } from 'remotion';
import React from 'react';
import { BlueprintCard } from '../components/BlueprintCard';
import { UserCaption } from '../components/UserCaption';
import { ProductCaption } from '../components/ProductCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene05_Blueprint: React.FC = () => {
  const { label, score, verdict, bullets, userCaptionPre, userCaptionPost, productCaption } = COPY.c05;

  return (
    <AbsoluteFill style={{ backgroundColor: '#08080F' }}>
      <SceneAudio filename="v4_s5_blue_s" />

      <div style={{ position: 'absolute', width: 800, height: 500, background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)', top: '10%', right: '5%' }} />
      <FeatureLabel text="Market Blueprint" startFrame={0} position="top-left" />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <BlueprintCard label={label} score={score} verdict={verdict} bullets={bullets} startFrame={0} />
      </div>

      <UserCaption text={userCaptionPre} startFrame={20} exitFrame={120} />
      <UserCaption text={userCaptionPost} startFrame={130} />
      <Sequence from={200}>
        <SceneAudio filename="v4_s5_blue_p" />
      </Sequence>
      <ProductCaption text={productCaption} startFrame={200} />
    </AbsoluteFill>
  );
};
