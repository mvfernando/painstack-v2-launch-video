import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
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
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <Sequence from={60}>
        <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.6} />
      </Sequence>
      {/* THE STITCH DING - Exactly on BUILD verdict */}
      <Sequence from={90}>
        <Audio src={staticFile('audio/sfx_ding.mp3')} volume={0.15} />
      </Sequence>
      <SceneAudio filename="v4_s5_blue_s" />

      <div style={{ position: 'absolute', width: 800, height: 500, background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)', top: '10%', right: '5%' }} />
      <FeatureLabel text="Market Blueprint" startFrame={0} position="top-left" />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <BlueprintCard label={label} score={score} verdict={verdict} bullets={bullets} startFrame={0} />
      </div>

      <UserCaption text={userCaptionPre} startFrame={10} exitFrame={80} />
      <UserCaption text={userCaptionPost} startFrame={95} exitFrame={160} />
      <Sequence from={175}>
        <SceneAudio filename="v4_s5_blue_p" />
        <ProductCaption text={productCaption} startFrame={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
