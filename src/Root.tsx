import { Composition } from 'remotion';
import { Video1Social } from './compositions/Video1Social';
import { Video2Walkthrough } from './compositions/Video2Walkthrough';

export const RemotionRoot = () => {
  return (
    <>
      {/* VIDEO 1: 30s Social Launch — X, LinkedIn */}
      <Composition
        id="PainstackV2-Social"
        component={Video1Social}
        durationInFrames={1110}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 2: 60s Walkthrough — LinkedIn, Landing Page */}
      <Composition
        id="PainstackV2-Walkthrough"
        component={Video2Walkthrough}
        durationInFrames={1575}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
