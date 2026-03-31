import { ReactNode } from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { DotGridBackground } from './components/DotGridBackground';
import { BackgroundMusic } from './shared/SceneAudio';
import { Scene01_BrandOpen } from './scenes/Scene01_BrandOpen';
import { Scene01B_Teaser } from './scenes/Scene01B_Teaser';
import { Scene02_Pain } from './scenes/Scene02_Pain';
import { Scene03_Input } from './scenes/Scene03_Input';
import { Scene04_Wait } from './scenes/Scene04_Wait';
import { Scene05_Blueprint } from './scenes/Scene05_Blueprint';
import { Scene06_Transition1 } from './scenes/Scene06_Transition1';
import { Scene07_MarketCEO } from './scenes/Scene07_MarketCEO';
import { Scene08_CMO } from './scenes/Scene08_CMO';
import { Scene09_CTO } from './scenes/Scene09_CTO';
import { Scene10_Transition2 } from './scenes/Scene10_Transition2';
import { Scene11_Roadmap } from './scenes/Scene11_Roadmap';
import { Scene12_Transition3 } from './scenes/Scene12_Transition3';
import { Scene13_Dataroom } from './scenes/Scene13_Dataroom';
import { Scene14_ZoomOut } from './scenes/Scene14_ZoomOut';
import { Scene15_Stats } from './scenes/Scene15_Stats';
import { Scene16_HookFinal } from './scenes/Scene16_HookFinal';
import { Scene17_BrandClose } from './scenes/Scene17_BrandClose';
import { Scene18_FadeOut } from './scenes/Scene18_FadeOut';

const OVERLAP = 12; // 400ms at 30fps

const LiquidSequence = ({ from, durationInFrames, children, isFirst = false }: {from: number; durationInFrames: number; children: ReactNode; isFirst?: boolean}) => {
  const frame = useCurrentFrame();
  const rel = frame - from;
  
  // Transition IN
  const opacityIn = isFirst ? 1 : interpolate(rel, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const blurIn = isFirst ? 0 : interpolate(rel, [0, OVERLAP], [8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });

  // Transition OUT
  const isOut = rel >= durationInFrames - OVERLAP;
  const outRel = rel - (durationInFrames - OVERLAP);
  
  const opacityOut = interpolate(outRel, [0, OVERLAP], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const blurOut = interpolate(outRel, [0, OVERLAP], [0, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });

  const finalOpacity = rel < OVERLAP ? opacityIn : (isOut ? opacityOut : 1);
  const finalBlur = rel < OVERLAP ? blurIn : (isOut ? blurOut : 0);

  return (
    <Sequence from={from} durationInFrames={durationInFrames} style={{ opacity: finalOpacity, filter: `blur(${finalBlur}px)` }}>
      {children}
    </Sequence>
  );
};

export const PainstackVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // HIGH-ENERGY 92s TIMELINE (2760 frames total)
  const DURS = {
    S1: 170, S1B: 241, S2: 219, S3: 267, S4: 250, S5: 238, S6: 209, S7: 165, S8: 154, S9: 191,
    S10: 178, S11: 115, S12: 150, S13: 119, S14: 91, S15: 157, S16: 223, S17: 150, S18: 90
  };

  // Sequence offsets with CROSSFADE overlaps
  const F1   = DURS.S1 - OVERLAP;
  const F1B  = F1 + DURS.S1B - OVERLAP;
  const F2   = F1B + DURS.S2 - OVERLAP;
  const F3   = F2 + DURS.S3 - OVERLAP;
  const F4   = F3 + DURS.S4 - OVERLAP;
  const F5   = F4 + DURS.S5 - OVERLAP;
  const F6   = F5 + DURS.S6 - OVERLAP;
  const F7   = F6 + DURS.S7 - OVERLAP;
  const F8   = F7 + DURS.S8 - OVERLAP;
  const F9   = F8 + DURS.S9 - OVERLAP;
  const F10  = F9 + DURS.S10 - OVERLAP;
  const F11  = F10 + DURS.S11 - OVERLAP;
  const F12  = F11 + DURS.S12 - OVERLAP;
  const F13  = F12 + DURS.S13 - OVERLAP;
  const F14  = F13 + DURS.S14 - OVERLAP;
  const F15  = F14 + DURS.S15 - OVERLAP;
  const F16  = F15 + DURS.S16 - OVERLAP;
  const F17  = F16 + DURS.S17 - OVERLAP;

  // Audio Ducking Intervals
  const sIntervals = [
    [20, F1-20], [F1+20, F1B-20], [F1B+20, F2-20], [F2+20, F3-20], [F3+20, F4-20],
    [F4+20, F5-20], [F5+10, F6-10], [F6+20, F7-20], [F7+20, F8-20], [F8+20, F9-20],
    [F9+10, F10-10], [F10+20, F11-20], [F11+20, F12-20], [F12+20, F13-20], [F13+20, F14-20],
    [F14+20, F15-20], [F15+10, F16-10], [F16+10, F17-10]
  ];

  const isSpeaking = sIntervals.some(([s, e]) => frame >= s && frame <= e);
  const duckSpring = spring({ 
    frame: frame - (isSpeaking ? (sIntervals.find(([s]) => frame >= s)?.[0] || 0) : (sIntervals.find(([_, e]) => frame > e)?.[1] || 0)), 
    fps, 
    config: { stiffness: 60, damping: 20 } 
  });
  const duckVolumeFactor = interpolate(duckSpring, [0, 1], isSpeaking ? [1, 0.4] : [0.4, 1]);
  const musicFadeOut = interpolate(frame, [3100, 3161], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalMusicVolume = 0.12 * duckVolumeFactor * musicFadeOut;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <DotGridBackground />
      <BackgroundMusic volume={finalMusicVolume} />
      <LiquidSequence from={0}    durationInFrames={DURS.S1} isFirst><Scene01_BrandOpen /></LiquidSequence>
      <LiquidSequence from={F1}   durationInFrames={DURS.S1B}><Scene01B_Teaser /></LiquidSequence>
      <LiquidSequence from={F1B}  durationInFrames={DURS.S2}><Scene02_Pain /></LiquidSequence>
      <LiquidSequence from={F2}   durationInFrames={DURS.S3}><Scene03_Input /></LiquidSequence>
      <LiquidSequence from={F3}   durationInFrames={DURS.S4}><Scene04_Wait /></LiquidSequence> 
      <LiquidSequence from={F4}   durationInFrames={DURS.S5}><Scene05_Blueprint /></LiquidSequence>
      <LiquidSequence from={F5}   durationInFrames={DURS.S6}><Scene06_Transition1 /></LiquidSequence>
      <LiquidSequence from={F6}   durationInFrames={DURS.S7}><Scene07_MarketCEO /></LiquidSequence>
      <LiquidSequence from={F7}   durationInFrames={DURS.S8}><Scene08_CMO /></LiquidSequence>
      <LiquidSequence from={F8}   durationInFrames={DURS.S9}><Scene09_CTO /></LiquidSequence>
      <LiquidSequence from={F9}   durationInFrames={DURS.S10}><Scene10_Transition2 /></LiquidSequence>
      <LiquidSequence from={F10}  durationInFrames={DURS.S11}><Scene11_Roadmap /></LiquidSequence>
      <LiquidSequence from={F11}  durationInFrames={DURS.S12}><Scene12_Transition3 /></LiquidSequence>
      <LiquidSequence from={F12}  durationInFrames={DURS.S13}><Scene13_Dataroom /></LiquidSequence>
      <LiquidSequence from={F13}  durationInFrames={DURS.S14}><Scene14_ZoomOut /></LiquidSequence>
      <LiquidSequence from={F14}  durationInFrames={DURS.S15}><Scene15_Stats /></LiquidSequence>
      <LiquidSequence from={F15}  durationInFrames={DURS.S16}><Scene16_HookFinal /></LiquidSequence>
      <LiquidSequence from={F16}  durationInFrames={DURS.S17}><Scene17_BrandClose /></LiquidSequence>
      <LiquidSequence from={F17}  durationInFrames={DURS.S18}><Scene18_FadeOut /></LiquidSequence>
    </AbsoluteFill>
  );
};
