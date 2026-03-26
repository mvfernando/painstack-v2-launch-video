import { Composition } from 'remotion';
import { Video1Social } from './compositions/Video1Social';
import { Video2Walkthrough } from './compositions/Video2Walkthrough';
import { Video3Shorts } from './compositions/Video3Shorts';
import { PainstackVideo } from './compositions/Video4Product';

export const RemotionRoot = () => {
  return (
    <>
      {/* VIDEO 1: 30s Social Launch — X, LinkedIn */}
      <Composition
        id="PainstackV2-Social"
        component={Video1Social}
        durationInFrames={1450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 2: 60s Walkthrough — LinkedIn, Landing Page */}
      <Composition
        id="PainstackV2-Walkthrough"
        component={Video2Walkthrough}
        durationInFrames={2200}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 3: 15s Reels/Shorts — Vertical */}
      <Composition
        id="PainstackV2-Shorts"
        component={Video3Shorts}
        durationInFrames={800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* VIDEO 4: 90s Product — Stitch-Calibrated Dialogue */}
      <Composition
        id="PainstackV3-Product"
        component={PainstackVideo}
        durationInFrames={5120}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
