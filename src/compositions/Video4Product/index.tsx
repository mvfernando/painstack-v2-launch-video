import { AbsoluteFill, Sequence } from 'remotion';
import { BackgroundMusic } from './shared/SceneAudio';
import { Scene01_BrandOpen } from './scenes/Scene01_BrandOpen';
import { Scene02_Pain } from './scenes/Scene02_Pain';
import { Scene03_Input } from './scenes/Scene03_Input';
import { Scene04_Internet } from './scenes/Scene04_Internet';
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

export const PainstackVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#060609' }}>
    <BackgroundMusic volume={0.07} />
    <Sequence from={0}    durationInFrames={240}><Scene01_BrandOpen /></Sequence>
    <Sequence from={240}  durationInFrames={300}><Scene02_Pain /></Sequence>
    <Sequence from={540}  durationInFrames={300}><Scene03_Input /></Sequence>
    <Sequence from={840}  durationInFrames={240}><Scene04_Internet /></Sequence>
    <Sequence from={1080} durationInFrames={420}><Scene05_Blueprint /></Sequence>
    <Sequence from={1500} durationInFrames={180}><Scene06_Transition1 /></Sequence>
    <Sequence from={1680} durationInFrames={360}><Scene07_MarketCEO /></Sequence>
    <Sequence from={2040} durationInFrames={300}><Scene08_CMO /></Sequence>
    <Sequence from={2340} durationInFrames={300}><Scene09_CTO /></Sequence>
    <Sequence from={2640} durationInFrames={300}><Scene10_Transition2 /></Sequence>
    <Sequence from={2940} durationInFrames={360}><Scene11_Roadmap /></Sequence>
    <Sequence from={3300} durationInFrames={300}><Scene12_Transition3 /></Sequence>
    <Sequence from={3600} durationInFrames={420}><Scene13_Dataroom /></Sequence>
    <Sequence from={4020} durationInFrames={300}><Scene14_ZoomOut /></Sequence>
    <Sequence from={4320} durationInFrames={300}><Scene15_Stats /></Sequence>
    <Sequence from={4620} durationInFrames={300}><Scene16_HookFinal /></Sequence>
    <Sequence from={4920} durationInFrames={300}><Scene17_BrandClose /></Sequence>
    <Sequence from={5220} durationInFrames={180}><Scene18_FadeOut /></Sequence>
  </AbsoluteFill>
);
