
import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene2bBridge } from './scenes/Scene2bBridge';
import { Scene4Agents } from './scenes/Scene4Agents';
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { Scene6CTA } from './scenes/Scene6CTA';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';
import { colors } from '../../shared/brand';

// --- Transition Helper ---
const Transition = ({ duration, children }: { duration: number; children: React.ReactNode }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Video1Social: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <BackgroundMusic />
      
      {/* S1: Hook (0-123) | Audio: 103 + 20 buffer */}
      <Sequence durationInFrames={123}>
        <Scene1Hook />
        <SceneAudio filename="v1_s1_hook" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
      </Sequence>

      {/* S2: Problem (123-360) | Audio: 212 + 25 buffer */}
      <Sequence from={123} durationInFrames={237}>
        <Transition duration={237}>
            <Scene2Problem />
        </Transition>
        <SceneAudio filename="v1_s2_problem" />
        
        <Sequence from={10} durationInFrames={180}>
            {/* Quote Pops */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135].map((d, i) => (
                <Sequence key={i} from={d} durationInFrames={15}>
                    <Audio src={staticFile('audio/sfx_pop_soft.mp3')} volume={0.15} />
                </Sequence>
            ))}
        </Sequence>
      </Sequence>

      {/* S2b: Bridge (360-565) | Audio: 180 + 25 buffer */}
      <Sequence from={360} durationInFrames={205}>
        <Transition duration={205}>
            <Scene2bBridge />
        </Transition>
        <SceneAudio filename="v1_s2b_bridge" />
      </Sequence>

      {/* S3: Input (565-744) | Audio: 154 + 25 buffer */}
      <Sequence from={565} durationInFrames={179}>
        <Transition duration={179}>
            <DashboardInputScene withInteractions />
        </Transition>
        <SceneAudio filename="v1_s3_input" />
        <Sequence from={15} durationInFrames={100}>
          <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
        <Sequence from={154} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      {/* S4: Agents (744-1037) | Audio: 268 + 25 buffer */}
      <Sequence from={744} durationInFrames={293}>
        <Transition duration={293}>
            <Scene4Agents />
        </Transition>
        <SceneAudio filename="v1_s4_agents" />
        <Sequence from={40} durationInFrames={120}>
          <Audio src={staticFile('audio/sfx_data_scan.mp3')} volume={0.25} />
        </Sequence>
      </Sequence>

      {/* S5: Verdict (1037-1245) | Audio: 183 + 25 buffer */}
      <Sequence from={1037} durationInFrames={208}>
        <Transition duration={208}>
            <BlueprintScoreScene />
        </Transition>
        <SceneAudio filename="v1_s5_verdict" />
        <Sequence from={90} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>

      {/* S6: CTA (1245-1450) | Audio: 131 + huge buffer */}
      <Sequence from={1245} durationInFrames={205}>
        <Scene6CTA />
        <SceneAudio filename="v1_s6_cta" />
        <Sequence from={10} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        </Sequence>
      </Sequence>
      
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 200px rgba(0,0,0,0.3)', zIndex: 10 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
