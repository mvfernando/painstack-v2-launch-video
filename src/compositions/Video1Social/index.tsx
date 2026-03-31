
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

export const Video1Social = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <BackgroundMusic />
      
      {/* S1: Hook (0-114) | Speech: 99 + 15 buffer */}
      <Sequence durationInFrames={114}>
        <Scene1Hook />
        <SceneAudio filename="v1_s1_hook" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
      </Sequence>

      {/* S2: Problem (114-372) | Speech: 243 + 15 buffer */}
      <Sequence from={114} durationInFrames={258}>
        <Transition duration={258}>
            <Scene2Problem />
        </Transition>
        <SceneAudio filename="v1_s2_problem" />
        
        <Sequence from={10} durationInFrames={180}>
            {/* Quote Pops */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135].map((d, i) => (
                <Sequence key={i} from={d} durationInFrames={15}>
                    <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.15} />
                </Sequence>
            ))}
        </Sequence>
      </Sequence>

      {/* S2b: Bridge (372-550) | Speech: 163 + 15 buffer */}
      <Sequence from={372} durationInFrames={178}>
        <Transition duration={178}>
            <Scene2bBridge />
        </Transition>
        <SceneAudio filename="v1_s2b_bridge" />
        
        {/* Evidence Popcorn SFX */}
        {[90, 110, 130, 150].map((d, i) => (
            <Sequence key={i} from={d} durationInFrames={15}>
                <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.2} />
            </Sequence>
        ))}
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.1} />
      </Sequence>

      {/* S3: Input (550-710) | Speech: 145 + 15 buffer */}
      <Sequence from={550} durationInFrames={160}>
        <Transition duration={160}>
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

      {/* S4: Agents (710-925) | Speech: 200 + 15 buffer */}
      <Sequence from={710} durationInFrames={215}>
        <Transition duration={215}>
            <Scene4Agents />
        </Transition>
        <SceneAudio filename="v1_s4_agents" />
        <Sequence from={40} durationInFrames={100}>
          <Audio src={staticFile('audio/sfx_data_scan.mp3')} volume={0.25} />
        </Sequence>
      </Sequence>

      {/* S5: Verdict (925-1046) | Speech: 91 + 30 buffer */}
      <Sequence from={925} durationInFrames={121}>
        <Transition duration={121}>
            <BlueprintScoreScene />
        </Transition>
        <SceneAudio filename="v1_s5_verdict" />
        <Sequence from={60} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>

      {/* S6: CTA (1046-1216) | Speech: 110 + 60 buffer */}
      <Sequence from={1046} durationInFrames={170}>
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
