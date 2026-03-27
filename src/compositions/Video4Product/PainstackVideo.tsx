import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { BackgroundMusic } from './shared/SceneAudio';
import { Scene01_BrandOpen } from './scenes/Scene01_BrandOpen';
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

const OVERLAP = 15;

const FadeSequence: React.FC<{from: number; durationInFrames: number; children: React.ReactNode}> = ({ from, durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const rel = frame - from;
  const opacity = interpolate(rel, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Sequence from={from} durationInFrames={durationInFrames} style={{ opacity }}>
      {children}
    </Sequence>
  );
};

export const PainstackVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pacing DURATIONS (Increased by ~25% to guarantee narrator completes without cutoff)
  const DURS = {
    S1: 260, S2: 380, S3: 800, S4: 560, S5: 680, S6: 220, S7: 680, S8: 560, S9: 560, 
    S10: 300, S11: 680, S12: 300, S13: 800, S14: 560, S15: 560, S16: 560, S17: 600, S18: 240
  };

  // Sequence offsets with CROSSFADE overlaps
  const F1 = DURS.S1 - OVERLAP;
  const F2 = F1 + DURS.S2 - OVERLAP;
  const F3 = F2 + DURS.S3 - OVERLAP;
  const F4 = F3 + DURS.S4 - OVERLAP;
  const F5 = F4 + DURS.S5 - OVERLAP;
  const F6 = F5 + DURS.S6 - OVERLAP;
  const F7 = F6 + DURS.S7 - OVERLAP;
  const F8 = F7 + DURS.S8 - OVERLAP;
  const F9 = F8 + DURS.S9 - OVERLAP;
  const F10 = F9 + DURS.S10 - OVERLAP;
  const F11 = F10 + DURS.S11 - OVERLAP;
  const F12 = F11 + DURS.S12 - OVERLAP;
  const F13 = F12 + DURS.S13 - OVERLAP;
  const F14 = F13 + DURS.S14 - OVERLAP;
  const F15 = F14 + DURS.S15 - OVERLAP;
  const F16 = F15 + DURS.S16 - OVERLAP;
  const F17 = F16 + DURS.S17 - OVERLAP;

  // Audio Ducking Intervals
  const sIntervals = [
    [20, F1-20], [F1+20, F2-20], [F2+20, F3-20], [F3+20, F4-20],
    [F4+20, F5-20], [F6+20, F7-20], [F7+20, F8-20], [F8+20, F9-20],
    [F10+20, F11-20], [F12+20, F13-20], [F13+20, F14-20], [F14+20, F15-20], [F15+20, F16-20]
  ];

  const isSpeaking = sIntervals.some(([s, e]) => frame >= s && frame <= e);
  const duckSpring = spring({ 
    frame: frame - (isSpeaking ? (sIntervals.find(([s]) => frame >= s)?.[0] || 0) : (sIntervals.find(([_, e]) => frame > e)?.[1] || 0)), 
    fps, 
    config: { stiffness: 60, damping: 20 } 
  });
  const duckVolumeFactor = interpolate(duckSpring, [0, 1], isSpeaking ? [1, 0.4] : [0.4, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <BackgroundMusic volume={0.12 * duckVolumeFactor} />
      <Sequence from={0}    durationInFrames={DURS.S1}><Scene01_BrandOpen /></Sequence>
      <FadeSequence from={F1}   durationInFrames={DURS.S2}><Scene02_Pain /></FadeSequence>
      <FadeSequence from={F2}   durationInFrames={DURS.S3}><Scene03_Input /></FadeSequence>
      <FadeSequence from={F3}   durationInFrames={DURS.S4}><Scene04_Wait /></FadeSequence> 
      <FadeSequence from={F4}   durationInFrames={DURS.S5}><Scene05_Blueprint /></FadeSequence>
      <FadeSequence from={F5}   durationInFrames={DURS.S6}><Scene06_Transition1 /></FadeSequence>
      <FadeSequence from={F6}   durationInFrames={DURS.S7}><Scene07_MarketCEO /></FadeSequence>
      <FadeSequence from={F7}   durationInFrames={DURS.S8}><Scene08_CMO /></FadeSequence>
      <FadeSequence from={F8}   durationInFrames={DURS.S9}><Scene09_CTO /></FadeSequence>
      <FadeSequence from={F9}   durationInFrames={DURS.S10}><Scene10_Transition2 /></FadeSequence>
      <FadeSequence from={F10}  durationInFrames={DURS.S11}><Scene11_Roadmap /></FadeSequence>
      <FadeSequence from={F11}  durationInFrames={DURS.S12}><Scene12_Transition3 /></FadeSequence>
      <FadeSequence from={F12}  durationInFrames={DURS.S13}><Scene13_Dataroom /></FadeSequence>
      <FadeSequence from={F13}  durationInFrames={DURS.S14}><Scene14_ZoomOut /></FadeSequence>
      <FadeSequence from={F14}  durationInFrames={DURS.S15}><Scene15_Stats /></FadeSequence>
      <FadeSequence from={F15}  durationInFrames={DURS.S16}><Scene16_HookFinal /></FadeSequence>
      <FadeSequence from={F16}  durationInFrames={DURS.S17}><Scene17_BrandClose /></FadeSequence>
      <FadeSequence from={F17}  durationInFrames={DURS.S18}><Scene18_FadeOut /></FadeSequence>
    </AbsoluteFill>
  );
};
