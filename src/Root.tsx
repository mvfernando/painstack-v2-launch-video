import { Composition } from 'remotion';
import { Video1Social } from './compositions/Video1Social';
import { Video2Walkthrough } from './compositions/Video2Walkthrough';
import { Video3Shorts } from './compositions/Video3Shorts';
import { PainstackVideo } from './compositions/Video4Product';
import { Video4Social } from './compositions/Video4Social';


export const RemotionRoot = () => {
  return (
    <>
      {/* VIDEO 1: 30s Social Launch — X, LinkedIn */}
      <Composition
        id="PainstackV2-Social"
        component={Video1Social}
        durationInFrames={1216}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 2: 60s Walkthrough — LinkedIn, Landing Page */}
      <Composition
        id="PainstackV2-Walkthrough"
        component={Video2Walkthrough}
        durationInFrames={2213}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 3: 15s Reels/Shorts — Vertical */}
      <Composition
        id="PainstackV2-Shorts"
        component={Video3Shorts}
        durationInFrames={632}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* VIDEO 4: 92s Product — Stitch-Calibrated Dialogue */}
      <Composition
        id="PainstackV3-Product"
        component={PainstackVideo}
        durationInFrames={3180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="PainstackV4-Social"
        component={Video4Social}
        durationInFrames={2100}
        fps={60}
        width={1920}
        height={1080}
      />

      <Composition
        id="PainstackV4-SocialVertical"
        component={Video4Social}
        durationInFrames={2100}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
